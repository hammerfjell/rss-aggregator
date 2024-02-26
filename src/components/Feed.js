"use client";
import labelColors from "@/helpers/labelColors";
import Link from "next/link";

export default function Feed({ feed }) {

    const color = labelColors[feed.color];

    return (
        <div className="flex flex-col gap-2 border-b-4 border-b-slate-800 border-dotted">
            <p className="text-sm flex flex-row gap-2">
                <p style={{ background: color?.background, color: color?.text }} className="small-caps rounded px-2">
                    {feed.label}
                </p>
                <p className="opacity-50">
                    {feed.description}
                </p>
                <p className="ml-auto">
                    {new Date(feed.published).toLocaleString()}
                </p>
            </p>
            <Link href={feed.link} target="_blank" className="hover:underline">{feed.title}</Link>
        </div>
    );
}