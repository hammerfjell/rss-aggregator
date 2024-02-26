"use client";

import Feed from "@/components/Feed";
import Loading from "@/components/Loading";
import { formatQuantity } from "@/helpers/utils";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function App() {

    const [feeds, setFeeds] = useState([]);

    const query = useQuery({
        queryKey: ["full-feeds"],
        queryFn: api.getFullFeeds
    });

    useEffect(() => {
        if(query.isSuccess) {
            setFeeds(query.data.content);
        }
    }, [query.data]);

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">RSS Home</h1>
            {query.isLoading && <Loading />}
            {query.isSuccess && <p>{formatQuantity(feeds.length, "feed", "feeds")}</p>}
            {query.isSuccess && feeds.map(feed => <Feed key={feed.id} feed={feed} />)}
        </div>
    );
}