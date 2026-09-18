"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import {
  BookOpen,
  Map,
  Sparkles,
  GraduationCap,
  Trophy,
  ClipboardList,
  LogOut,
} from "lucide-react";

const quick = [
  { href: "/takyryptar", label: "Тақырыптар", icon: BookOpen },
  { href: "/kartalar", label: "Карталар", icon: Map },
  { href: "/ji", label: "ЖИ жоспар", icon: Sparkles },
  { href: "/pisa", label: "PISA", icon: GraduationCap },
  { href: "/olimpiada", label: "Олимпиада", icon: Trophy },
  { href: "/testter", label: "Тесттер", icon: ClipboardList },
];

export default function DashboardPage() {
  const { user, ready, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-mountain-600">
        Жүктелуде...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <span className="section-badge">Dashboard</span>
      <h1 className="page-title mt-3">
        Сәлем, {user.aty} {user.zhoni}!
      </h1>
      <p className="page-subtitle">
        Рөліңіз: <strong>{user.rol}</strong> · Логин: {user.login}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quick.map((q) => (
          <Link key={q.href} href={q.href} className="card flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-100 text-forest-700">
              <q.icon className="h-5 w-5" />
            </span>
            <span className="font-serif text-lg font-bold text-forest-900">
              {q.label}
            </span>
          </Link>
        ))}
      </div>

      {user.rol === "мұғалім" && (
        <div className="mt-8 rounded-2xl border border-sky-200 bg-sky-50 p-6">
          <h2 className="font-serif text-xl font-bold text-sky-900">
            Мұғалімге арналған
          </h2>
          <p className="mt-2 text-sm text-sky-800">
            ЖИ бөлімінде КМЖ, БЖБ және ТЖБ құжаттарын жасап, көшіріп немесе жүктеп
            алыңыз. Тақырыптарды оқулық §§ бойынша таңдаңыз.
          </p>
          <Link href="/ji" className="btn-primary mt-4">
            <Sparkles className="h-4 w-4" />
            ЖИ генераторға өту
          </Link>
        </div>
      )}

      <button
        onClick={() => {
          logout();
          router.push("/");
        }}
        className="btn-secondary mt-10"
      >
        <LogOut className="h-4 w-4" />
        Шығу
      </button>
    </div>
  );
}
