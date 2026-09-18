import { Mountain } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-forest-200/50 bg-forest-900 text-forest-100">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <div className="flex items-center gap-2 font-serif text-xl font-bold">
              <Mountain className="h-6 w-6 text-forest-300" />
              География Әлемі
            </div>
            <p className="mt-2 max-w-sm text-sm text-forest-300">
              8–9 сынып географиясы: карта, ЖИ жоспарлау, PISA, олимпиада және
              тесттер — бір платформада.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-3">
            <div>
              <p className="mb-2 font-semibold text-forest-200">Бөлімдер</p>
              <ul className="space-y-1 text-forest-300">
                <li><Link href="/kartalar" className="hover:text-white">Карта түрлері</Link></li>
                <li><Link href="/ji" className="hover:text-white">ЖИ жоспарлау</Link></li>
                <li><Link href="/takyryptar" className="hover:text-white">Тақырыптар</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-2 font-semibold text-forest-200">Дайындық</p>
              <ul className="space-y-1 text-forest-300">
                <li><Link href="/pisa" className="hover:text-white">PISA</Link></li>
                <li><Link href="/olimpiada" className="hover:text-white">Олимпиада</Link></li>
                <li><Link href="/testter" className="hover:text-white">Тесттер</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-2 font-semibold text-forest-200">Аккаунт</p>
              <ul className="space-y-1 text-forest-300">
                <li><Link href="/login" className="hover:text-white">Кіру</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-8 border-t border-forest-800 pt-4 text-center text-xs text-forest-400">
          © {new Date().getFullYear()} География Әлемі · Қазақстан · 8–9 сынып
        </p>
      </div>
    </footer>
  );
}
