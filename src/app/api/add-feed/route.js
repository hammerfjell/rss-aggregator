import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST (request) {

    //sleep 1000ms
    await new Promise(resolve => setTimeout(resolve, 1000));

    const data = await request.json();

    // TODO: Validate
    if(!data.url.trim() || !data.name.trim()) {
        return NextResponse.json({ message: "Invalid data." }, { status: 400 });
    }

    const session = await getServerSession(authOptions);

    if(!session) {
        return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user?.id
        }
    })

    if(!user) {
        return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    await prisma.feed.create({
        data: {
            name: data.name,
            url: data.url,
            color: parseInt(data.color),
            user : { connect: { id: user.id } }
        }
    });

    return NextResponse.json({ message: "Feed added successfully." }, { status: 201 });
}