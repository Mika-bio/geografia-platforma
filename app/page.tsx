import Link from "next/link";
import {
  Map,
  Sparkles,
  GraduationCap,
  Trophy,
  ClipboardList,
  BookOpen,
  Compass,
  Mountain,
  Route,
} from "lucide-react";

const features = [
  {
    href: "/kartalar",
    title: "Географиялық карта түрлері",
    desc: "Физикалық, саяси, климаттық, ГАЖ және басқа карталарды саяхат стилінде зерттеңіз.",
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
    color: "from-horizon-500 to-earth-600",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero — journey / horizon */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-hero-journey" />
        <div className="absolute inset-0 -z-10">
          <div className="absolute -right-16 -top-24 h-80 w-80 rounded-full bg-sky-300/35 blur-3xl" />
          <div className="absolute -left-16 top-32 h-72 w-72 rounded-full bg-forest-300/40 blur-3xl" />
          <div className="absolute bottom-10 right-1/3 h-48 w-48 rounded-full bg-horizon-300/30 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:pt-24">
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="section-badge">
                <Compass className="h-3.5 w-3.5" />
                8–9 сынып · Қазақстан · саяхат
              </span>
              <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.1] text-forest-900 sm:text-5xl lg:text-6xl">
                Географияға{" "}
                <span className="bg-gradient-to-r from-sky-600 via-forest-600 to-horizon-600 bg-clip-text text-transparent">
                  саяхат
                </span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-mountain-600">
                Тау шыңдарынан горизонтқа дейін — карталар, жасанды интеллект
                арқылы сабақ жоспары, PISA мен олимпиада дайындығы. Бүкіл жол
                қазақ тілінде.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/takyryptar" className="btn-primary">
                  <Route className="h-4 w-4" />
                  Саяхатты бастау
                </Link>
                <Link href="/login" className="btn-secondary">
                  <Compass className="h-4 w-4" />
                  Кіру / Тіркелу
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-4 text-sm text-mountain-600">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1 shadow-sm backdrop-blur-sm">
                  <Mountain className="h-4 w-4 text-forest-600" />
                  Табиғат эстетикасы
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1 shadow-sm backdrop-blur-sm">
                  <Map className="h-4 w-4 text-sky-600" />
                  Карта мен маршрут
                </span>
              </div>
            </div>

            {/* Decorative journey map / mountains */}
            <div className="relative w-full max-w-md shrink-0">
              <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-sky-400/30 via-forest-400/20 to-horizon-400/30 blur-xl" />
              <svg
                viewBox="0 0 400 280"
                className="relative w-full drop-shadow-xl"
                aria-hidden
              >
                <defs>
                  <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#82bfe6" />
                    <stop offset="45%" stopColor="#d6eaf8" />
                    <stop offset="100%" stopColor="#ffefd4" />
                  </linearGradient>
                  <linearGradient id="m1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#63718c" />
                    <stop offset="55%" stopColor="#2f9159" />
                    <stop offset="100%" stopColor="#1e5c3b" />
                  </linearGradient>
                  <linearGradient id="m2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7e8da6" />
                    <stop offset="100%" stopColor="#4aad74" />
                  </linearGradient>
                  <linearGradient id="pathG" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f97c12" />
                    <stop offset="100%" stopColor="#2f83bd" />
                  </linearGradient>
                </defs>
                <rect width="400" height="280" rx="28" fill="url(#skyG)" />
                <circle cx="310" cy="52" r="30" fill="#ffc170" opacity="0.95" />
                <circle cx="310" cy="52" r="38" fill="#ff9e38" opacity="0.2" />
                <path
                  d="M0 280 L0 175 L70 95 L130 155 L195 55 L275 145 L335 80 L400 155 L400 280 Z"
                  fill="url(#m1)"
                  opacity="0.88"
                />
                <path
                  d="M0 280 L0 205 L55 145 L115 195 L175 110 L255 185 L315 130 L400 195 L400 280 Z"
                  fill="url(#m2)"
                />
                <path
                  d="M0 280 L0 235 Q110 195 210 225 T400 215 L400 280 Z"
                  fill="#247448"
                  opacity="0.92"
                />
                {/* trail / journey path */}
                <path
                  d="M55 230 C120 210, 160 250, 210 220 S300 200, 355 185"
                  fill="none"
                  stroke="url(#pathG)"
                  strokeWidth="3"
                  strokeDasharray="6 8"
                  strokeLinecap="round"
                  opacity="0.9"
                />
                <circle cx="55" cy="230" r="6" fill="#f97c12" />
                <circle cx="210" cy="220" r="5" fill="#2f83bd" />
                <circle cx="355" cy="185" r="7" fill="#247448" stroke="#fff" strokeWidth="2" />
                <ellipse cx="95" cy="248" rx="9" ry="15" fill="#2f9159" />
                <ellipse cx="128" cy="252" rx="7" ry="12" fill="#1e5c3b" />
                <ellipse cx="290" cy="250" rx="8" ry="13" fill="#2f9159" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mountain-divider h-24 w-full" />
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <span className="section-badge">
            <Map className="h-3.5 w-3.5" />
            Маршруттар
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-forest-900">
            Арнайы мәзір
          </h2>
          <p className="mt-2 text-mountain-600">
            Барлық бөлімдер бір жерде — оқушы мен мұғалімге ыңғайлы
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="card group relative overflow-hidden"
            >
              <div
                className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${f.color} opacity-10 transition group-hover:opacity-20`}
              />
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
      <section className="border-y border-forest-100/80 bg-white/50 py-16 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-serif text-3xl font-bold text-forest-900">
            Оқулық құрылымы
          </h2>
          <p className="page-subtitle">
            Физикалық география — литосфера, атмосфера, гидросфера және
            картография
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "Зерттеу әдістері",
                s: "§1–3",
                c: "bg-earth-100/90 text-earth-900 border border-earth-200/60",
              },
              {
                t: "Картография және ГМБ",
                s: "§4–6",
                c: "bg-sky-100/90 text-sky-900 border border-sky-200/60",
              },
              {
                t: "Литосфера",
                s: "§7–16",
                c: "bg-earth-100/90 text-earth-950 border border-earth-200/60",
              },
              {
                t: "Атмосфера",
                s: "§17–24",
                c: "bg-sky-100/90 text-sky-950 border border-sky-200/60",
              },
              {
                t: "Гидросфера",
                s: "§25–32",
                c: "bg-forest-100/90 text-forest-900 border border-forest-200/60",
              },
              {
                t: "Терминдер сөздігі",
                s: "А–Я",
                c: "bg-horizon-50 text-horizon-900 border border-horizon-200/60",
              },
            ].map((item) => (
              <div key={item.t} className={`rounded-2xl p-5 shadow-soft ${item.c}`}>
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
