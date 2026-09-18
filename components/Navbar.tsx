"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Globe2, LogOut, User, ChevronDown } from "lucide-react";
import { useAuth } from "./AuthProvider";

const links = [
  { href: "/", label: "Басты" },
  { href: "/takyryptar", label: "Тақырыптар" },
  { href: "/olimpiada", label: "Олимпиада" },
  { href: "/pisa", label: "PISA" },
  { href: "/testter", label: "Тесттер" },
  { href: "/karta", label: "Карта" },
  { href: "/ji", label: "ЖИ / КМЖ" },
  { href: "/natizheler", label: "Нәтижелер" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, ready } = useAuth();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-white/95 shadow-soft">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-navy-700 text-white shadow-soft">
            <Globe2 className="h-5 w-5" />
            <span className="absolute inset-1 rounded-lg border border-gold-300/40" aria-hidden />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-base font-bold text-navy-800 sm:text-lg">
              GEOGRAPHY PRO
            </span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-wide text-teal-700 sm:block">
              8–9 · Олимпиада · PISA · Тест
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {links.map((l) => {
            const active =
              pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-2 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-navy-700 text-white"
                    : "text-mountain-700 hover:bg-teal-50 hover:text-navy-800"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          {user?.rol === "мұғалім" && (
            <Link
              href="/mugalim"
              className={`rounded-lg px-2 py-1.5 text-sm font-medium ${
                pathname.startsWith("/mugalim")
                  ? "bg-gold-300 text-navy-900"
                  : "text-mountain-700 hover:bg-gold-50"
              }`}
            >
              Мұғалім
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {ready && user ? (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-navy-200 bg-sand-50 px-3 py-1.5 text-sm text-navy-800"
              >
                <User className="h-4 w-4" />
                <span className="font-medium">{user.aty}</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-navy-100 bg-white py-2 shadow-card">
                  <Link
                    href="/natizheler"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-teal-50"
                  >
                    Менің нәтижелерім
                  </Link>
                  {user.rol === "мұғалім" && (
                    <Link
                      href="/mugalim"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-teal-50"
                    >
                      Мұғалім панелі
                    </Link>
                  )}
                  <p className="px-4 py-1 text-xs text-mountain-500">Рөл: {user.rol}</p>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" /> Шығу
                  </button>
                </div>
              )}
            </div>
          ) : ready ? (
            <Link
              href="/login"
              className="hidden rounded-full bg-navy-700 px-4 py-1.5 text-sm font-semibold text-white hover:bg-navy-800 sm:inline-flex"
            >
              Кіру / Тіркелу
            </Link>
          ) : null}
          <button
            className="rounded-lg p-2 text-navy-700 xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Мәзір"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-navy-100 bg-white px-4 py-3 xl:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-mountain-700 hover:bg-teal-50"
              >
                {l.label}
              </Link>
            ))}
            {user?.rol === "мұғалім" && (
              <Link
                href="/mugalim"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium"
              >
                Мұғалім
              </Link>
            )}
            <Link
              href={user ? "/natizheler" : "/login"}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-navy-700"
            >
              {user ? "Нәтижелер" : "Кіру / Тіркелу"}
            </Link>
            {user && (
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="rounded-lg px-3 py-2 text-left text-sm text-red-700"
              >
                Шығу
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
