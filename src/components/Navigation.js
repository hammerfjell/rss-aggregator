"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import FeedLabel from "./FeedLabel";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Error } from "./Message";
import Loading from "./Loading";

export default function Navigation() {

    const { data: session } = useSession();

    const query = useQuery({
        queryKey: ["feeds"],
        queryFn: api.getFeeds
    });

    return (
        <div className="flex flex-col gap-4 h-full text-xl relative">
            <div className="flex flex-row gap-4 items-center">
                <img src={session.user?.image} alt="User" width={64} height={64} className="rounded-xl" />
                <div className="flex flex-col">
                    <p>{session.user?.name}</p>
                    <button onClick={() => void signOut()} className="text-red-500 text-sm hover:underline">Sign out</button>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <Link href="/app" className="bg-[url('/rss-logo.png')] bg-no-repeat bg-left bg-[length:auto_70%] pl-7 text-[#f7981c]">Feeds</Link>
                <Link href="/app/add" className="bg-[url('/ui/add-icon.png')] bg-no-repeat bg-left bg-[length:auto_70%] pl-6">Add</Link>
            </div>
            <div className="flex-1 flex flex-col gap-1">
                {query.isLoading && <Loading />}
                {query.isError && <Error queryObject={query} />}
                {query.data?.feeds.length === 0 && <p className="px-4">No feeds yet, <Link href="/app/add" className="underline text-[#f7981c]">add</Link> a new feed to start!</p>}
                {query.data?.feeds.map(feed => <FeedLabel key={feed.id} feed={feed} />)}
            </div>
        </div>
    )
}