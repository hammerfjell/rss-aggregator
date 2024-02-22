import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST (request) {

    const data = await request.json();

    // TODO: Validate
    if(!data.url.trim() || !data.name.trim()) {
        return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

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

    const feed = await prisma.feed.create({
        data: {
            name: data.name,
            url: data.url,
            user : { connect: { id: user.id } }
        }
    });

    return NextResponse.json({ feed }, { status: 201 });
}