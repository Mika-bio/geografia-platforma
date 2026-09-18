"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function Page() {
  const router = useRouter();
  const { user, ready } = useAuth();
  useEffect(() => {
    if (!ready) return;
    if (!user) { router.replace("/login"); return; }
    router.replace("/natizheler");
  }, [router, user, ready]);
  return <p className="p-10 text-center">Бағытталуда...</p>;
}
