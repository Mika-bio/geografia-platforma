"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import type { SessionUser } from "@/lib/auth";

type Props = {
  children: React.ReactNode;
  /** If set, user must have this role (e.g. мұғалім). */
  role?: SessionUser["rol"];
};

/** Redirects to /login when there is no session; optional role check. */
export default function RequireAuth({ children, role }: Props) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (role && user.rol !== role) {
      router.replace("/");
    }
  }, [ready, user, role, router]);

  if (!ready || !user || (role && user.rol !== role)) {
    return (
      <div className="p-10 text-center text-mountain-600">Жүктелуде...</div>
    );
  }

  return <>{children}</>;
}
