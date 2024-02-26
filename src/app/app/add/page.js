"use client";
import {QueryMessage} from "@/components/Message";
import { handleFormChange } from "@/helpers/formHelpers";
import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import labelColors from "@/helpers/labelColors";

export default function AddPage() {

    const nameInputRef = useRef(null);
    const urlInputRef = useRef(null);
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        name: "",
        url: "",
        color: 0
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

    const handleColorSelection = (index) => {
        setFormData({...formData, color: parseInt(index)});
    }

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">Add Feed</h1>
            <QueryMessage queryObject={submit} />

            <p>Add a new feed</p>
            <input name="name" onChange={(e) => handleFormChange(e, setFormData)} ref={nameInputRef} type="text" placeholder="Name" />
            <input name="url" onChange={(e) => handleFormChange(e, setFormData)} ref={urlInputRef} type="text" placeholder="https://example.com/rss.xml" />
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
            <button onClick={() => submit.mutate()} disabled={submit.isPending} className={`button bg-slate-800 ${submit.isPending ? "loading" : ""}`}>Add</button>
        </div>
    )
}