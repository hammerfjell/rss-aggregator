"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import FeedLabel from "./FeedLabel";

export default function Navigation() {

    const { data: session } = useSession();

    return (
        <div className="flex flex-col gap-4 h-full text-xl ">
            <div className="flex flex-row gap-4 items-center">
                <img src={session.user?.image} alt="User" width={64} height={64} className="rounded-xl" />
                <p>{session.user?.name}</p>
            </div>
            <div className="flex flex-row justify-between">
                <Link href="/app" className="bg-[url('/rss-logo.png')] bg-no-repeat bg-left bg-[length:auto_70%] pl-7 text-[#f7981c]">Feeds</Link>
                <Link href="/app/add" className="bg-[url('/ui/add-icon.png')] bg-no-repeat bg-left bg-[length:auto_70%] pl-6">Add</Link>
            </div>
            <div className="flex-1 flex flex-col gap-1">
                <FeedLabel />
            </div>
            <button onClick={() => void signOut()} className="text-xl text-red-500 text-left hover:underline">Sign out</button>
        </div>
    )
}