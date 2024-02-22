"use client";
import { SessionProvider } from "next-auth/react";

/* SessionProvider in next-auth/react is exported by default as client component,
 * so with this workaround we can use it as server component */

export default SessionProvider;