import type { ComponentType } from "react";
import { mapTypes } from "@/lib/maps";
import {
  Mountain,
  Globe,
  Layers,
  Cloud,
  Pickaxe,
  Cpu,
  Satellite,
  Map,
  Sprout,
  Factory,
} from "lucide-react";

const icons: Record<string, ComponentType<{ className?: string }>> = {
  mountain: Mountain,
  globe: Globe,
  layers: Layers,
  cloud: Cloud,
  pickaxe: Pickaxe,
  cpu: Cpu,
  satellite: Satellite,
  map: Map,
  sprout: Sprout,
  factory: Factory,
};

const colorMap: Record<string, string> = {
  forest: "from-forest-500 to-forest-700 bg-forest-50 border-forest-100",
  sky: "from-sky-500 to-sky-700 bg-sky-50 border-sky-100",
  earth: "from-earth-500 to-earth-700 bg-earth-50 border-earth-100",
  mountain: "from-mountain-500 to-mountain-700 bg-mountain-50 border-mountain-100",
};

function MapIllustration({ id }: { id: string }) {
  if (id === "physical") {
    return (
      <svg viewBox="0 0 200 100" className="h-20 w-full">
        <rect width="200" height="100" fill="#dceee2" rx="8" />
        <path d="M0 80 L40 40 L70 60 L100 25 L140 55 L170 35 L200 70 L200 100 L0 100 Z" fill="#5ea87c" />
        <path d="M0 90 L50 70 L90 85 L130 65 L200 85 L200 100 L0 100 Z" fill="#3d8b5e" />
      </svg>
    );
  }
  if (id === "climate") {
    return (
      <svg viewBox="0 0 200 100" className="h-20 w-full">
        <rect width="200" height="100" fill="#dcecf8" rx="8" />
        <circle cx="40" cy="50" r="28" fill="#94c6e8" opacity="0.5" />
        <circle cx="100" cy="45" r="35" fill="#61a7da" opacity="0.4" />
        <circle cx="160" cy="55" r="25" fill="#3d8ac6" opacity="0.35" />
      </svg>
    );
  }
  if (id === "gis") {
    return (
      <svg viewBox="0 0 200 100" className="h-20 w-full">
        <rect width="200" height="100" fill="#f0f7f2" rx="8" />
        <rect x="20" y="20" width="70" height="50" fill="#bbddc6" opacity="0.7" rx="4" />
        <rect x="60" y="35" width="70" height="45" fill="#94c6e8" opacity="0.6" rx="4" />
        <rect x="100" y="25" width="60" height="40" fill="#cda882" opacity="0.5" rx="4" />
        <circle cx="50" cy="40" r="4" fill="#25593c" />
        <circle cx="90" cy="55" r="4" fill="#265888" />
        <circle cx="130" cy="40" r="4" fill="#6d4630" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 100" className="h-20 w-full">
      <rect width="200" height="100" fill="#faf6f1" rx="8" />
      <path d="M20 70 Q60 30 100 60 T180 50" fill="none" stroke="#a06f45" strokeWidth="3" />
      <path d="M30 80 Q80 50 120 75 T190 65" fill="none" stroke="#3d8b5e" strokeWidth="2" strokeDasharray="4 3" />
      <rect x="50" y="40" width="20" height="15" fill="#5ea87c" opacity="0.6" rx="2" />
      <rect x="120" y="35" width="25" height="18" fill="#61a7da" opacity="0.6" rx="2" />
    </svg>
  );
}

export default function KartalarPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <span className="section-badge">
        <Map className="h-3.5 w-3.5" />
        Картография
      </span>
      <h1 className="page-title mt-3">Географиялық карта түрлері</h1>
      <p className="page-subtitle">
        Әр карта өз мақсатына қызмет етеді. Төменде негізгі түрлер, қолданысы және
        қысқа иллюстрациялар берілген.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mapTypes.map((m) => {
          const Icon = icons[m.icon] || Map;
          const colors = colorMap[m.color] || colorMap.forest;
          const [grad, bg, border] = colors.split(" ");
          return (
            <article
              key={m.id}
              className={`rounded-2xl border ${border} ${bg} p-5 shadow-soft transition hover:shadow-card`}
            >
              <div className="mb-3 overflow-hidden rounded-xl">
                <MapIllustration id={m.id} />
              </div>
              <div className="flex items-start gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${grad} text-white shadow`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-serif text-lg font-bold text-forest-900">
                    {m.title}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-mountain-700">
                    {m.description}
                  </p>
                </div>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {m.uses.map((u) => (
                  <li
                    key={u}
                    className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-forest-800"
                  >
                    {u}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}
