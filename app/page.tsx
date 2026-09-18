"use client";

import Link from "next/link";
import {
  Trophy,
  GraduationCap,
  ClipboardList,
  BookOpen,
  Map,
  BarChart3,
  Play,
  Compass,
  LogIn,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import RewardsBar from "@/components/RewardsBar";

const links = [
  {
    href: "/takyryptar",
    title: "Тақырыптар",
    desc: "8 сынып — 25, 9 сынып — 27 тақырып",
    icon: BookOpen,
    accent: "bg-teal-600",
  },
  {
    href: "/olimpiada",
    title: "Олимпиада",
    desc: "3 деңгей · карта, координат, климат",
    icon: Trophy,
    accent: "bg-gold-500",
  },
  {
    href: "/pisa",
    title: "PISA",
    desc: "Сценарийлік талдау мен дәлел",
    icon: GraduationCap,
    accent: "bg-navy-700",
  },
  {
    href: "/testter",
    title: "Тесттер",
    desc: "100+ сұрақ әр сыныпқа",
    icon: ClipboardList,
    accent: "bg-teal-700",
  },
  {
    href: "/karta",
    title: "Интерактивті карта",
    desc: "Қазақстан + әлем қабаттары",
    icon: Map,
    accent: "bg-navy-600",
  },
  {
    href: "/natizheler",
    title: "Менің нәтижелерім",
    desc: "XP, бейдж, әлсіз тақырыптар",
    icon: BarChart3,
    accent: "bg-gold-600",
  },
];

export default function HomePage() {
  const { user, ready } = useAuth();

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-hero-geo" />
        {/* Lightweight abstract rings — no blur filters */}
        <div
          className="pointer-events-none absolute -right-8 -top-10 -z-10 h-64 w-64 rounded-full border border-navy-700/10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-2 top-6 -z-10 h-48 w-48 rounded-full border border-teal-600/15"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-16 top-20 -z-10 h-28 w-28 rounded-full border border-gold-400/30"
          aria-hidden
        />

        <div className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:pt-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="section-badge">
                <Compass className="h-3.5 w-3.5 text-teal-700" />
                8–9 сынып | Олимпиада • PISA • Тест
              </span>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
                GEOGRAPHY PRO
              </p>
              <h1 className="mt-2 font-serif text-4xl font-bold leading-[1.08] text-navy-900 sm:text-5xl lg:text-6xl">
                GEOGRAPHIC WORLD{" "}
                <span className="text-teal-700">&amp; PISA</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-mountain-600">
                Қазақ тіліндегі интерактивті география платформасы: теория, практика,
                олимпиадалық ойлау, PISA сценарийлері, тесттер және карта викторинасы.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {ready && user ? (
                  <>
                    <Link href="/takyryptar" className="btn-primary">
                      <Play className="h-4 w-4" /> Бастау
                    </Link>
                    <Link href="/olimpiada" className="btn-secondary">
                      Олимпиада
                    </Link>
                    <Link href="/pisa" className="btn-secondary">
                      PISA
                    </Link>
                    <Link href="/testter" className="btn-secondary">
                      Тесттер
                    </Link>
                    <Link href="/natizheler" className="btn-secondary">
                      Менің нәтижелерім
                    </Link>
                  </>
                ) : (
                  <Link href="/login" className="btn-primary">
                    <LogIn className="h-4 w-4" /> Кіру / Тіркелу
                  </Link>
                )}
              </div>
            </div>

            <div className="w-full max-w-md rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
              {ready && user ? (
                <>
                  <div className="mb-3 h-1 w-12 rounded-full bg-gold-300" />
                  <h2 className="font-serif text-xl font-bold text-navy-900">
                    Сәлем, {user.aty}!
                  </h2>
                  <p className="mt-1 text-sm text-mountain-600">
                    {user.zhoni} · {user.rol}
                    {user.grade ? ` · ${user.grade} сынып` : ""}
                  </p>
                  <Link href="/takyryptar" className="btn-primary mt-4 w-full justify-center">
                    <Play className="h-4 w-4" /> Оқуға өту
                  </Link>
                  {user.rol === "мұғалім" && (
                    <Link href="/mugalim" className="btn-secondary mt-2 w-full justify-center">
                      Мұғалім панелі
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <div className="mb-3 h-1 w-12 rounded-full bg-teal-600" />
                  <h2 className="font-serif text-xl font-bold text-navy-900">Кіру / Тіркелу</h2>
                  <p className="mt-1 text-sm text-mountain-600">
                    Алғаш рет — өз логин мен құпия сөзіңізбен тіркеліңіз. Кейін сол
                    аккаунтпен кіріңіз.
                  </p>
                  <Link href="/login" className="btn-primary mt-4 w-full justify-center">
                    <LogIn className="h-4 w-4" /> Кіру / Тіркелу
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mountain-divider h-[70px] w-full" />
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-10">
        {ready && user && <RewardsBar />}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((f) => (
            <Link
              key={f.href}
              href={ready && user ? f.href : "/login"}
              className="card group block"
            >
              <div
                className={`mb-4 inline-flex rounded-xl ${f.accent} p-3 text-white shadow-soft`}
              >
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-navy-900">{f.title}</h3>
              <p className="mt-1 text-sm text-mountain-600">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
