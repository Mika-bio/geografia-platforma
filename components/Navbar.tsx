"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  Mountain,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "./AuthProvider";

const links = [
  { href: "/", label: "Басты бет" },
  { href: "/kartalar", label: "Карта түрлері" },
  { href: "/ji", label: "ЖИ: КМЖ / БЖБ / ТЖБ" },
  { href: "/pisa", label: "PISA-ға дайындық" },
  { href: "/olimpiada", label: "Олимпиадаға дайындық" },
  { href: "/testter", label: "Тесттер" },
  { href: "/takyryptar", label: "Тақырыптар" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, ready } = useAuth();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-forest-200/60 bg-white/90 backdrop-blur-md shadow-soft">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-forest-500 to-sky-500 text-white shadow-md">
            <Mountain className="h-5 w-5" />
          </span>
          <span className="font-serif text-lg font-bold text-forest-800 group-hover:text-forest-600 transition-colors sm:text-xl">
            География Әлемі
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-forest-100 text-forest-800"
                    : "text-mountain-700 hover:bg-forest-50 hover:text-forest-700"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {ready && user ? (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-forest-200 bg-forest-50 px-3 py-1.5 text-sm text-forest-800 hover:bg-forest-100"
              >
                <User className="h-4 w-4" />
                <span className="font-medium">
                  {user.aty} {user.zhoni}
                </span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-forest-100 bg-white py-2 shadow-card">
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-mountain-700 hover:bg-forest-50"
                  >
                    Dashboard
                  </Link>
                  <p className="px-4 py-1 text-xs text-mountain-500">
                    Рөл: {user.rol}
                  </p>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Шығу
                  </button>
                </div>
              )}
            </div>
          ) : ready ? (
            <Link
              href="/login"
              className="hidden rounded-full bg-forest-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-forest-700 sm:inline-flex"
            >
              Кіру
            </Link>
          ) : null}

          <button
            className="rounded-lg p-2 text-forest-700 hover:bg-forest-50 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Мәзір"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-forest-100 bg-white px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname === l.href
                    ? "bg-forest-100 text-forest-800"
                    : "text-mountain-700 hover:bg-forest-50"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={user ? "/dashboard" : "/login"}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-forest-700 hover:bg-forest-50"
            >
              {user ? "Dashboard" : "Кіру"}
            </Link>
            {user && (
              <>
                <p className="px-3 pt-2 text-sm text-mountain-600">
                  {user.aty} {user.zhoni} · {user.rol}
                </p>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Шығу
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
