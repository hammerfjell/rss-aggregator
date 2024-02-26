import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import parse from "rss-to-json";

export async function GET (request) {
    //sleep 1000ms
    await new Promise(resolve => setTimeout(resolve, 1000));

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

    const feeds = await prisma.feed.findMany({
        where: {
            user: {
                id: user.id
            }
        },
        select: {
            id: true,
            name: true,
            url: true,
            color: true
        }
    });

    const content = [];

    for(let i = 0; i < feeds.length; i++) {
        const data = await parse(feeds[i].url);

        data.items.forEach(item => {
            content.push({
                feedId: feeds[i].id,
                label: feeds[i].name,
                color: feeds[i].color,
                description: data.description,
                title: item.title,
                link: item.link,
                published: item.published,
            });
        });
    }

    //order by published desc
    content.sort((a, b) => new Date(b.published) - new Date(a.published));

    return NextResponse.json({ content }, { status: 200 });
}