import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET (request, { params }) {

    //sleep 1000ms
    await new Promise(resolve => setTimeout(resolve, 1000));

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

    return NextResponse.json({ feed }, { status: 200 });
}