"use client";
import {QueryMessage} from "@/components/Message";
import { handleFormChange } from "@/helpers/formHelpers";
import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

export default function AddPage() {

    const nameInputRef = useRef(null);
    const urlInputRef = useRef(null);
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        name: "",
        url: "",
    });

    useEffect(() => {
        nameInputRef.current.focus();
    }, []);

    const submit = useMutation({
        mutationFn: () => api.addFeed(formData),
        onSuccess: () => {
            nameInputRef.current.value = "";
            urlInputRef.current.value = "";
            nameInputRef.current.focus();
            // invalidate the feeds query
            queryClient.invalidateQueries({queryKey: ["feeds"]});
        }
    });

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">Add Feed</h1>
            <QueryMessage queryObject={submit} />

            <p>Add a new feed</p>
            <input name="name" onChange={(e) => handleFormChange(e, setFormData)} ref={nameInputRef} type="text" placeholder="Name" />
            <input name="url" onChange={(e) => handleFormChange(e, setFormData)} ref={urlInputRef} type="text" placeholder="https://example.com/rss.xml" />
            <details>
                <summary className="cursor-pointer opacity-50">Advanced</summary>
                <div className="flex flex-row gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Telegram_2019_Logo.svg" alt="Telegram" width={24} height={24} />
                    <p>Telegram</p>
                </div>
            </details>
            <button onClick={() => submit.mutate()} disabled={submit.isPending} className={`button bg-slate-800 ${submit.isPending ? "loading" : ""}`}>Add</button>
        </div>
    )
}