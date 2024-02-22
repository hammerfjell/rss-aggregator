"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {

    const { data: session } = useSession();

    if(session) {
        return redirect("/app");
    }

    return (
        <div className="flex flex-col gap-2 justify-center items-center p-4 h-screen">
            <h1 className="text-2xl font-semibold">RSS Aggregator</h1>
            <Image src="/rss-logo.png" alt="Viking" width={150} height={150} className="my-8" />
            <button className="bg-blue-500 button button-icon-left bg-[url('/providers/github.png')]" onClick={() => signIn('github')}>
                Continue with GitHub
            </button>
            <button disabled className="bg-white button button-icon-left bg-[url('/providers/google.svg')] text-black" onClick={() => signIn('google')}>
                Continue with Google
            </button>
        </div>
    )
}
