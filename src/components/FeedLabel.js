"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function FeedLabel({ feed }) {

    const [visible, setVisible] = useState(true);

    //TODO: save the state in local storage

    return (
        <div className="bg-blue-500 pl-2 pr-3 rounded-lg flex flex-row items-center gap-2">
            <button onClick={() => setVisible(!visible)}>
                <Image
                    src="/ui/rss-icon.png"
                    alt="Visibility"
                    width={16} height={16}
                    className={visible ? "opacity-70" : "opacity-20"} />
            </button>
            <p>{feed.name}</p>
            <Link href={`/app/edit/${feed.id}`} className="ml-auto">
                <Image
                    src="/ui/edit-icon.png"
                    alt="Visibility"
                    width={16} height={16} />
            </Link>
        </div>
    )
}