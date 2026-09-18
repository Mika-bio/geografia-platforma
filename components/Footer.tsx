import Link from "next/link";
import { Globe2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-navy-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-700 text-white">
            <Globe2 className="h-4 w-4" />
          </span>
          <div>
            <p className="font-serif font-bold text-navy-900">GEOGRAPHY PRO</p>
            <p className="text-xs text-mountain-600">GEOGRAPHIC WORLD & PISA · 8–9 сынып</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-medium text-teal-800">
          <Link href="/olimpiada" className="hover:text-navy-800">
            Олимпиада
          </Link>
          <Link href="/pisa" className="hover:text-navy-800">
            PISA
          </Link>
          <Link href="/testter" className="hover:text-navy-800">
            Тесттер
          </Link>
          <Link href="/karta" className="hover:text-navy-800">
            Карта
          </Link>
          <Link href="/mugalim" className="hover:text-navy-800">
            Мұғалім
          </Link>
        </div>
        <p className="text-xs text-mountain-500">Оқу мақсатында · Қазақ тілі</p>
      </div>
    </footer>
  );
}
