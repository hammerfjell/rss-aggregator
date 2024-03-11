"use client";
import Loading from "@/components/Loading";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Feed from "@/components/Feed";
import { formatQuantity } from "@/helpers/utils";

export default function FeedPage() {

    const { feedId, feedName } = useParams();
    const [feeds, setFeeds] = useState([]);

    const query = useQuery({
        queryKey: ["feed-news", feedId],
        queryFn: () => api.getFeedNews(feedId)
    });

    useEffect(() => {
        if(query.isSuccess) {
            setFeeds(query.data.content);
        }
    }, [query.data]);

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">RSS for {feedName}</h1>
            {query.isLoading && <Loading />}
            {query.isSuccess && <p>{formatQuantity(feeds.length, "feed", "feeds")}</p>}
            {query.isSuccess && feeds.map(feed => <Feed key={feed.id} feed={feed} />)}
        </div>
    )
}