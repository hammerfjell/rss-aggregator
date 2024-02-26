"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import labelColors from "@/helpers/labelColors";

export default function FeedLabel({ feed }) {

    const color = labelColors[feed.color];

    const invert = color.text === "white" || feed.color === 0;

    return (
        <div style={{ background: color?.background, color: color?.text }} className="pl-2 pr-3 rounded-lg flex flex-row items-center gap-2">
            <Image
                style={{ filter: invert ? "invert(100%)" : "invert(0%)" }}
                src="/ui/rss-icon.png"
                alt="Rss"
                width={16} height={16} />
            <p>{feed.name}</p>
            <Link href={`/app/edit/${feed.id}`} className="ml-auto">
                <Image
                    style={{ filter: invert ? "invert(100%)" : "invert(0%)" }}
                    src="/ui/edit-icon.png"
                    alt="Visibility"
                    width={16} height={16} />
            </Link>
        </div>
    )
}