import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import parse from "rss-to-json";

export async function GET (request, { params }) {

    const { feedId } = params;

    const session = await getServerSession(authOptions);

    if(!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user?.id
        }
    })

    if(!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const feed = await prisma.feed.findUnique({
        where: {
            id: feedId,
            user: {
                id: user.id
            }
        }
    });

    if(!feed) {
        return NextResponse.json({ message: "Feed not found" }, { status: 404 });
    }

    const content = [];

    const data = await parse(feed.url);

    data.items.forEach(item => {
        content.push({
            feedId: feed.id,
            label: feed.name,
            color: feed.color,
            description: data.description,
            title: item.title,
            link: item.link,
            published: item.published,
        });
    });

    return NextResponse.json({ content }, { status: 200 });
}