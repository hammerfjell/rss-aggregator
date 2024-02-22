import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AppLayout({ children } ) {

    const session = await getServerSession(authOptions);

    if(!session) {
        return redirect("/");
    }

    return (
        <div>
            {children}
        </div>
    )
}