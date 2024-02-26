"use server";
import { redirect } from "next/navigation";

// force it to be a server component, can't use 'redirect' in client components
export default async function navigate(url) {
    redirect(url);
}