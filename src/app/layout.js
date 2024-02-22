import { Inter } from "next/font/google";
import "./globals.css";
import "./css/button.css"
import QueryProvider from "@/components/QueryProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RSS Aggregator",
  description: "",
};

export default async function RootLayout({ children }) {
    
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
        <body>
        <SessionProvider session={session}>
        <QueryProvider>
            {children}
        </QueryProvider>
        </SessionProvider>    
        </body>
        </html>
    );
}
