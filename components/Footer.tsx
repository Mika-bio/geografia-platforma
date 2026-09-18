import Link from "next/link";
import { Globe2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-forest-200/60 bg-white/70 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Globe2 className="h-5 w-5 text-forest-600" />
          <div>
            <p className="font-serif font-bold text-forest-900">GEOGRAPHY PRO</p>
            <p className="text-xs text-mountain-600">GEOGRAPHIC WORLD & PISA · 8–9 сынып</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-forest-700">
          <Link href="/olimpiada">Олимпиада</Link>
          <Link href="/pisa">PISA</Link>
          <Link href="/testter">Тесттер</Link>
          <Link href="/karta">Карта</Link>
          <Link href="/mugalim">Мұғалім</Link>
        </div>
        <p className="text-xs text-mountain-500">Оқу мақсатында · Қазақ тілі</p>
      </div>
    </footer>
  );
}
