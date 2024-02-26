import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH (request, { params }) {

    const { feedId } = params;

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

    await prisma.feed.update({
        where: {
            id: feedId,
            user: {
                id: user.id
            }
        },
        data: {
            name: data.name,
            url: data.url
        }
    })

    return NextResponse.json({ message: "Feed edited successfully." }, { status: 201 });
}