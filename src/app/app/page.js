"use client";

import FeedLabel from "@/components/FeedLabel";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function App() {

    const { data: session } = useSession();

    return (
        <div className="flex flex-row gap-2 items-center">
            <h1 className="text-2xl font-semibold">RSS Home</h1>
        </div>
    )
}