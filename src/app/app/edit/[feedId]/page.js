"use client";
import Loading from "@/components/Loading";
import { Error, QueryMessage } from "@/components/Message";
import { handleFormChange } from "@/helpers/formHelpers";
import navigate from "@/helpers/navigation";
import api from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import labelColors from "@/helpers/labelColors";

export default function EditPage() {

    const { feedId } = useParams();

    const nameInputRef = useRef(null);
    const urlInputRef = useRef(null);
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        name: "",
        url: "",
        color: 0
    });

    const query = useQuery({
        queryKey: ["feed", feedId],
        queryFn: () => api.getFeed(feedId)
    });

    const editMutation = useMutation({
        mutationFn: () => api.editFeed(feedId, formData),
        onSuccess: () => {
            // invalidate the feeds query
            queryClient.invalidateQueries({queryKey: ["feeds"]});
        }
    });

    const deleteMutation = useMutation({
        mutationFn: () => api.deleteFeed(feedId),
        onSuccess: () => {
            // invalidate the feeds query
            queryClient.invalidateQueries({ queryKey: ["feeds"] });
            // redirect to /app
            navigate("/app");
        }
    });

    useEffect(() => {
        if (query.isSuccess) {
            setFormData({
                name: query.data.feed.name,
                url: query.data.feed.url,
                color: parseInt(query.data.feed.color)
            })
        }
    }, [query.data]);

    const handleColorSelection = (index) => {
        setFormData({...formData, color: parseInt(index)});
    }

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">Edit Feed</h1>
            {query.isLoading && <Loading size="64px" />}
            {query.isError && <Error queryObject={query} />}
            {query.isSuccess &&
                <>
                    <QueryMessage queryObject={editMutation} />
                    {deleteMutation.isError && <Error queryObject={deleteMutation} />}
                    <p>Edit this feed</p>
                    <input name="name" value={formData.name} onChange={(e) => handleFormChange(e, setFormData)} ref={nameInputRef} type="text" placeholder="Name" />
                    <input name="url" value={formData.url} onChange={(e) => handleFormChange(e, setFormData)} ref={urlInputRef} type="text" placeholder="https://example.com/rss.xml" />
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-4">
                            <p>Label Color: </p>
                            <p className="rounded px-2" style={{background: labelColors[formData.color]?.background, color: labelColors[formData.color]?.text}}>{labelColors[formData.color]?.name}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            {labelColors.map((color, index) => (
                                <button key={index} onClick={() => handleColorSelection(index)} className="rounded p-2" style={{background: color.background, color: color.text}}>T</button>
                            ))}
                        </div>
                    </div>
                    <button onClick={deleteMutation.mutate} disabled={deleteMutation.isPending} className={`button bg-red-500 ${deleteMutation.isPending ? "loading" : ""}`}>Delete</button>
                    <button onClick={editMutation.mutate} disabled={editMutation.isPending} className={`button bg-slate-800 ${editMutation.isPending ? "loading" : ""}`}>Save</button>
                </>}
        </div>
    )
}