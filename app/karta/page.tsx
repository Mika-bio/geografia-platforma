"use client";
import RequireAuth from "@/components/RequireAuth";

import { useMemo, useState } from "react";
import { Map } from "lucide-react";
import { mapData, kzLayers, worldLayers, MapPoint } from "@/lib/maps";
import { addResult, getProfile } from "@/lib/storage";

type Mode = "kz" | "world";

export default function KartaPage() {
  const [mode, setMode] = useState<Mode>("kz");
  const [layer, setLayer] = useState<string>("oblasts");
  const [quiz, setQuiz] = useState(false);
  const [target, setTarget] = useState<MapPoint | null>(null);
  const [msg, setMsg] = useState("");
  const [score, setScore] = useState({ ok: 0, total: 0 });
  const [found, setFound] = useState<string[]>([]);

  const points: MapPoint[] = useMemo(() => {
    if (mode === "kz") {
      const k = mapData.kazakhstan as Record<string, MapPoint[]>;
      return k[layer] || mapData.kazakhstan.oblasts;
    }
    const w = mapData.world as Record<string, MapPoint[]>;
    return w[layer] || mapData.world.countries;
  }, [mode, layer]);

  function startQuiz() {
    setQuiz(true);
    setScore({ ok: 0, total: 0 });
    setFound([]);
    setMsg("");
    pickNext([]);
  }

  function pickNext(already: string[]) {
    const pool = points.filter((p) => !already.includes(p.id));
    if (!pool.length) {
      setTarget(null);
      setMsg("Викторина аяқталды!");
      const profile = getProfile();
      const percent = score.total ? Math.round((score.ok / Math.max(score.total, 1)) * 100) : 100;
      addResult({
        name: profile?.name || "Оқушы",
        grade: profile?.grade || 8,
        type: "map",
        title: `Карта викторинасы (${mode}/${layer})`,
        correct: score.ok,
        total: Math.max(score.total, 1),
        percent,
        score: score.ok * 10,
        xp: 25,
      });
      return;
    }
    setTarget(pool[Math.floor(Math.random() * pool.length)]);
  }

  function clickPoint(p: MapPoint) {
    if (!quiz || !target) {
      setMsg(p.name);
      return;
    }
    const ok = p.id === target.id;
    const nextScore = { ok: score.ok + (ok ? 1 : 0), total: score.total + 1 };
    setScore(nextScore);
    setMsg(ok ? `✓ Дұрыс: ${p.name}` : `✗ Қате. Дұрысы: ${target.name}`);
    const nf = ok ? [...found, p.id] : found;
    if (ok) setFound(nf);
    setTimeout(() => {
      setMsg("");
      pickNext(ok ? nf : found);
    }, 700);
  }

  const layers = mode === "kz" ? kzLayers : worldLayers;

  return (
    <RequireAuth>
    <div className="mx-auto max-w-5xl px-4 py-10">
      <span className="section-badge"><Map className="h-3.5 w-3.5" /> Карта</span>
      <h1 className="page-title mt-3">Интерактивті карта</h1>
      <p className="page-subtitle">Қазақстан және әлем: елдер, облыстар, өзендер, көлдер, таулар, қазбалар, зоналар — басып табу викторинасы.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <button onClick={() => { setMode("kz"); setLayer("oblasts"); setQuiz(false); }} className={`rounded-full px-4 py-2 text-sm font-semibold ${mode === "kz" ? "bg-forest-600 text-white" : "bg-white border"}`}>Қазақстан</button>
        <button onClick={() => { setMode("world"); setLayer("countries"); setQuiz(false); }} className={`rounded-full px-4 py-2 text-sm font-semibold ${mode === "world" ? "bg-sky-600 text-white" : "bg-white border"}`}>Әлем</button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {layers.map((l) => (
          <button key={l.key} onClick={() => { setLayer(l.key); setQuiz(false); }} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${layer === l.key ? "bg-horizon-100 text-horizon-800" : "bg-white border border-forest-100"}`}>
            {l.label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {!quiz ? (
          <button className="btn-primary" onClick={startQuiz}>Викторинаны бастау</button>
        ) : (
          <>
            <p className="text-sm font-semibold text-forest-800">
              Табыңыз: <span className="text-horizon-700">{target?.name || "—"}</span>
            </p>
            <p className="text-sm text-mountain-600">Ұпай: {score.ok}/{score.total}</p>
            <button className="btn-secondary" onClick={() => setQuiz(false)}>Тоқтату</button>
          </>
        )}
        {msg && <span className="rounded-full bg-white px-3 py-1 text-sm shadow">{msg}</span>}
      </div>

      <div className="card mt-6 overflow-hidden p-0">
        <svg viewBox="0 0 100 100" className="h-[420px] w-full bg-gradient-to-b from-sky-100 to-earth-50">
          {mode === "kz" ? (
            <path d="M12,40 L18,28 L35,22 L55,18 L70,22 L85,32 L88,48 L82,62 L75,72 L55,78 L35,74 L22,62 L14,52 Z" fill="#d5eee0" stroke="#247448" strokeWidth="0.6" />
          ) : (
            <>
              <ellipse cx="22" cy="42" rx="14" ry="18" fill="#cfe6f7" stroke="#23689f" strokeWidth="0.4" />
              <ellipse cx="50" cy="40" rx="18" ry="16" fill="#d5eee0" stroke="#247448" strokeWidth="0.4" />
              <ellipse cx="78" cy="48" rx="14" ry="16" fill="#ffefd4" stroke="#c24809" strokeWidth="0.4" />
              <ellipse cx="30" cy="70" rx="10" ry="12" fill="#aeddbf" stroke="#247448" strokeWidth="0.4" />
              <ellipse cx="80" cy="75" rx="9" ry="7" fill="#e5cfb0" stroke="#925c37" strokeWidth="0.4" />
            </>
          )}
          {points.map((p) => (
            <g key={p.id} onClick={() => clickPoint(p)} className="cursor-pointer">
              <circle
                cx={p.x}
                cy={p.y}
                r={quiz && target?.id === p.id ? 2.2 : 1.8}
                fill={found.includes(p.id) ? "#2f9159" : quiz && target?.id === p.id ? "#f97c12" : "#2f83bd"}
                stroke="#fff"
                strokeWidth="0.4"
              />
              {!quiz && (
                <text x={p.x} y={p.y - 2.2} textAnchor="middle" fontSize="2.2" fill="#153d29">{p.name.split(" ")[0]}</text>
              )}
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {points.map((p) => (
          <button key={p.id} onClick={() => clickPoint(p)} className={`rounded-lg border px-3 py-2 text-left text-sm ${found.includes(p.id) ? "border-forest-400 bg-forest-50" : "border-forest-100 bg-white"}`}>
            {p.name}
          </button>
        ))}
      </div>
    </div>
    </RequireAuth>
  );
}
