"use client";

import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return null;
  if (!session) redirect("/auth");

  return (
    <div className="flex min-h-svh items-center justify-center">
      <p>Home</p>
    </div>
  );
}
