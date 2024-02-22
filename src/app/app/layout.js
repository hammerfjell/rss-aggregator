import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Navigation from "@/components/Navigation";

export default async function AppLayout({ children } ) {

    const session = await getServerSession(authOptions);

    if(!session) {
        return redirect("/");
    }

    return (
        <div className="grid grid-cols-4  min-h-screen h-full">
            <div className="p-8 min-h-screen h-full">
                <Navigation />
            </div>
            <div className="col-span-3 border-x-2 border-gray-800 min-h-screen h-full p-8">
                {children}
            </div>
        </div>
    )
}