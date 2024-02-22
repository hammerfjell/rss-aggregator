"use client";

import { signOut, useSession } from "next-auth/react";

export default function App() {

    const { data: session } = useSession();

    return (
        <div className="flex flex-col gap-4">
            <p>{session.user?.name}</p>
            <button onClick={() => signOut()} className="text-red-500 hover:underline">Sign out</button>
        </div>
    )
}