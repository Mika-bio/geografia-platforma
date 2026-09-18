import Link from "next/link";
import {
  Map,
  Sparkles,
  GraduationCap,
  Trophy,
  ClipboardList,
  BookOpen,
  Leaf,
  Compass,
} from "lucide-react";

const features = [
  {
    href: "/kartalar",
    title: "Географиялық карта түрлері",
    desc: "Физикалық, саяси, климаттық, ГАЖ және басқа карталарды табиғат стилінде зерттеңіз.",
    icon: Map,
    color: "from-forest-500 to-forest-700",
  },
  {
    href: "/ji",
    title: "ЖИ: КМЖ / БЖБ / ТЖБ",
    desc: "Мұғалімдерге арналған жоспар мен бағалау құжаттарын бір батырмамен жасаңыз.",
    icon: Sparkles,
    color: "from-sky-500 to-sky-700",
  },
  {
    href: "/pisa",
    title: "PISA-ға дайындық",
    desc: "Географиялық сауаттылық: график, карта және себеп-салдарлық ойлау тапсырмалары.",
    icon: GraduationCap,
    color: "from-earth-500 to-earth-700",
  },
  {
    href: "/olimpiada",
    title: "Олимпиадаға дайындық",
    desc: "Литосфера, атмосфера, гидросфера және картография бойынша күрделі сұрақтар.",
    icon: Trophy,
    color: "from-mountain-500 to-mountain-700",
  },
  {
    href: "/testter",
    title: "Тесттер",
    desc: "40+ сұрақ, қатемен жұмыс түсіндірмелері, бөлім бойынша бағалау.",
    icon: ClipboardList,
    color: "from-forest-600 to-sky-600",
  },
  {
    href: "/takyryptar",
    title: "Тақырыптар",
    desc: "Оқулық мазмұны: кіріспеден гидросфераға дейін — §1–32 және терминдер.",
    icon: BookOpen,
    color: "from-earth-600 to-forest-600",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
          <div className="absolute -left-10 top-40 h-64 w-64 rounded-full bg-forest-200/50 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:pt-24">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="section-badge">
                <Leaf className="h-3.5 w-3.5" />
                8–9 сынып · Қазақстан
              </span>
              <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-forest-900 sm:text-5xl lg:text-6xl">
                География Әлемі
              </h1>
              <p className="mt-4 text-lg text-mountain-600 leading-relaxed">
                Табиғат әдемілігімен үйлескен оқу платформасы: карталар, жасанды
                интеллект арқылы сабақ жоспары, PISA мен олимпиада дайындығы —
                бәрі қазақ тілінде.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/takyryptar" className="btn-primary">
                  <BookOpen className="h-4 w-4" />
                  Тақырыптарды ашу
                </Link>
                <Link href="/login" className="btn-secondary">
                  <Compass className="h-4 w-4" />
                  Кіру / Тіркелу
                </Link>
              </div>
            </div>
            {/* Decorative SVG mountains */}
            <div className="relative w-full max-w-md shrink-0">
              <svg viewBox="0 0 400 280" className="w-full drop-shadow-lg" aria-hidden>
                <defs>
                  <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c0ddf2" />
                    <stop offset="100%" stopColor="#f0f7fc" />
                  </linearGradient>
                  <linearGradient id="m1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#767e96" />
                    <stop offset="100%" stopColor="#3d8b5e" />
                  </linearGradient>
                  <linearGradient id="m2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#939baf" />
                    <stop offset="100%" stopColor="#5ea87c" />
                  </linearGradient>
                </defs>
                <rect width="400" height="280" rx="24" fill="url(#skyG)" />
                <circle cx="320" cy="60" r="28" fill="#f5e6a8" opacity="0.9" />
                <path d="M0 280 L0 180 L80 100 L140 160 L200 70 L280 150 L340 90 L400 160 L400 280 Z" fill="url(#m1)" opacity="0.85" />
                <path d="M0 280 L0 210 L60 150 L120 200 L180 120 L260 190 L320 140 L400 200 L400 280 Z" fill="url(#m2)" />
                <path d="M0 280 L0 240 Q100 200 200 230 T400 220 L400 280 Z" fill="#2d6f49" opacity="0.9" />
                <path d="M40 200 Q55 180 70 200" fill="none" stroke="#bbddc6" strokeWidth="3" />
                <ellipse cx="100" cy="245" rx="8" ry="14" fill="#3d8b5e" />
                <ellipse cx="130" cy="250" rx="6" ry="11" fill="#25593c" />
                <ellipse cx="300" cy="248" rx="7" ry="12" fill="#3d8b5e" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mountain-divider h-20 w-full" />
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-forest-900">
            Арнайы мәзір
          </h2>
          <p className="mt-2 text-mountain-600">
            Барлық бөлімдер бір жерде — оқушы мен мұғалімге ыңғайлы
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Link key={f.href} href={f.href} className="card group relative overflow-hidden">
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} text-white shadow-md transition group-hover:scale-105`}
              >
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest-900 group-hover:text-forest-600">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mountain-600">
                {f.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Curriculum preview */}
      <section className="border-y border-forest-100 bg-white/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-serif text-3xl font-bold text-forest-900">
            Оқулық құрылымы
          </h2>
          <p className="page-subtitle">
            Физикалық география — литосфера, атмосфера, гидросфера және картография
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Зерттеу әдістері", s: "§1–3", c: "bg-earth-100 text-earth-800" },
              { t: "Картография және ГМБ", s: "§4–6", c: "bg-sky-100 text-sky-800" },
              { t: "Литосфера", s: "§7–16", c: "bg-earth-100 text-earth-900" },
              { t: "Атмосфера", s: "§17–24", c: "bg-sky-100 text-sky-900" },
              { t: "Гидросфера", s: "§25–32", c: "bg-forest-100 text-forest-900" },
              { t: "Терминдер сөздігі", s: "А–Я", c: "bg-mountain-100 text-mountain-800" },
            ].map((item) => (
              <div key={item.t} className={`rounded-2xl p-5 ${item.c}`}>
                <p className="text-xs font-bold uppercase tracking-wider opacity-70">
                  {item.s}
                </p>
                <p className="mt-1 font-serif text-lg font-bold">{item.t}</p>
              </div>
            ))}
          </div>
          <Link href="/takyryptar" className="btn-primary mt-8">
            Барлық тақырыптар
          </Link>
        </div>
      </section>
    </div>
  );
}
