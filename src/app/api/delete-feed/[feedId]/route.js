import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE (request, { params }) {

    const { feedId } = params;

    //sleep 1000ms
    await new Promise(resolve => setTimeout(resolve, 1000));

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

    await prisma.feed.delete({
        where: {
            id: feedId,
            user: {
                id: user.id
            }
        }
    });

    return NextResponse.json({ message: "Feed Deleted Successfully." }, { status: 200 });
}