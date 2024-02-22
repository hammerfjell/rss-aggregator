"use client";
import { handleFormChange } from "@/helpers/formHelpers";
import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export default function AddPage() {

    const inputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        url: "",
    });

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const submit = useMutation({
        mutationFn: () => api.addFeed(formData),
    });

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">Add Feed</h1>
            <p>Add a new feed</p>
            <input name="name" onChange={(e) => handleFormChange(e, setFormData)} ref={inputRef} type="text" placeholder="Name" />
            <input name="url" onChange={(e) => handleFormChange(e, setFormData)} type="text" placeholder="https://example.com/rss.xml" />
            <details>
                <summary className="cursor-pointer opacity-50">Advanced</summary>
                <div className="flex flex-row gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Telegram_2019_Logo.svg" alt="Telegram" width={24} height={24} />
                    <p>Telegram</p>
                </div>
            </details>
            <button onClick={() => submit.mutate()} disabled={submit.isLoading} className="button bg-slate-800">Add</button>
        </div>
    )
}