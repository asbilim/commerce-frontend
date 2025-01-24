"use client";
import { useSearchParams } from "next/navigation";
import { PendingPage } from "@/components/forms/state-pending";

export default function PendingEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  return <PendingPage email={decodeURIComponent(email)} />;
}
