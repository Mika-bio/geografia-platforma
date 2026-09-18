"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  useEffect(() => { router.replace("/natizheler"); }, [router]);
  return <p className="p-10 text-center">Бағытталуда...</p>;
}
