"use client";
import RequireAuth from "@/components/RequireAuth";

import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { pisaScenarios, PisaScenario } from "@/lib/pisa";
import { addResult, getProfile } from "@/lib/storage";

function Visual({ s }: { s: PisaScenario }) {
  const v = s.visual;
  if (v.kind === "chart" && v.bars) {
    const max = Math.max(...v.bars.map((b) => b.value), 1);
    return (
      <div className="rounded-xl border border-sky-100 bg-sky-50/50 p-4">
        <p className="mb-3 text-sm font-semibold text-sky-900">{v.title}</p>
        <div className="flex h-40 items-end gap-3">
          {v.bars.map((b) => (
            <div key={b.label} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-xs font-bold text-forest-800">{b.value}</span>
              <div className="w-full rounded-t-lg bg-gradient-to-t from-forest-600 to-sky-400" style={{ height: `${(b.value / max) * 100}%` }} />
              <span className="text-center text-[10px] text-mountain-600">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (v.kind === "line" && v.points) {
    return (
      <div className="rounded-xl border border-forest-100 bg-white p-4">
        <p className="mb-2 text-sm font-semibold">{v.title}</p>
        <svg viewBox="0 0 320 100" className="h-24 w-full">
          <polyline
            fill="none"
            stroke="#2f83bd"
            strokeWidth="3"
            points={v.points.map((p, i) => `${40 + i * 70},${90 - p.value / 2}`).join(" ")}
          />
          {v.points.map((p, i) => (
            <g key={p.label}>
              <circle cx={40 + i * 70} cy={90 - p.value / 2} r={4} fill="#2f9159" />
              <text x={40 + i * 70} y={98} textAnchor="middle" fontSize="10">{p.label}</text>
            </g>
          ))}
        </svg>
      </div>
    );
  }
  if (v.kind === "table" && v.headers && v.rows) {
    return (
      <div className="overflow-x-auto rounded-xl border border-forest-100">
        <p className="bg-forest-50 px-3 py-2 text-sm font-semibold">{v.title}</p>
        <table className="w-full text-sm">
          <thead><tr>{v.headers.map((h) => <th key={h} className="px-3 py-2 text-left">{h}</th>)}</tr></thead>
          <tbody>
            {v.rows.map((r, i) => (
              <tr key={i} className="border-t">{r.map((c, j) => <td key={j} className="px-3 py-2">{c}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-dashed border-sky-300 bg-sky-50 p-4 text-sm text-sky-900">
      <p className="font-semibold">{v.title}</p>
      <p className="mt-1">{v.note || "Карта / схема"}</p>
      <svg viewBox="0 0 200 80" className="mt-2 h-16 w-full">
        <ellipse cx="100" cy="40" rx="70" ry="28" fill="#aeddbf" stroke="#247448" />
        <circle cx="70" cy="35" r="4" fill="#c24809" />
        <circle cx="120" cy="45" r="4" fill="#c24809" />
        <text x="100" y="75" textAnchor="middle" fontSize="10" fill="#40495e">схема</text>
      </svg>
    </div>
  );
}

export default function PisaPage() {
  const [active, setActive] = useState<PisaScenario | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  function submit() {
    if (!active) return;
    let correct = 0;
    const wrong: { question: string; your?: string; correct: string; explanation: string }[] = [];
    for (const q of active.questions) {
      const a = answers[q.id];
      if (a === q.answer) correct++;
      else {
        wrong.push({
          question: q.prompt,
          your: a !== undefined ? q.options[a] : "—",
          correct: q.options[q.answer],
          explanation: q.feedback,
        });
      }
    }
    const total = active.questions.length;
    const percent = Math.round((correct / total) * 100);
    const profile = getProfile();
    addResult({
      name: profile?.name || "Оқушы",
      grade: profile?.grade || 8,
      type: "pisa",
      title: `PISA: ${active.title}`,
      correct,
      total,
      percent,
      score: correct * 15,
      xp: Math.max(20, Math.round(percent / 3)),
      wrong,
    });
    setDone(true);
  }

  return (
    <RequireAuth>
    <div className="mx-auto max-w-4xl px-4 py-10">
      <span className="section-badge"><GraduationCap className="h-3.5 w-3.5" /> PISA</span>
      <h1 className="page-title mt-3">PISA сценарийлері</h1>
      <p className="page-subtitle">Өмірлік жағдай + мәтін + диаграмма/кесте/карта + талдау және дәлел сұрақтары.</p>

      {!active ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {pisaScenarios.map((s) => (
            <button key={s.id} onClick={() => { setActive(s); setAnswers({}); setDone(false); }} className="card text-left">
              <h2 className="font-serif text-lg font-bold text-forest-900">{s.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-mountain-600">{s.situation}</p>
              <p className="mt-3 text-xs font-semibold text-sky-700">{s.questions.length} сұрақ · {s.visual.kind}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          <button className="btn-secondary" onClick={() => setActive(null)}>← Барлық сценарийлер</button>
          <div className="card space-y-3">
            <h2 className="font-serif text-2xl font-bold text-forest-900">{active.title}</h2>
            <div>
              <h3 className="text-sm font-bold text-forest-800">Жағдай</h3>
              <p className="text-mountain-700">{active.situation}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-forest-800">Мәтін / дерек</h3>
              <p className="text-mountain-700">{active.text}</p>
            </div>
            <Visual s={active} />
          </div>

          {!done ? (
            <div className="space-y-4">
              {active.questions.map((q, qi) => (
                <div key={q.id} className="card">
                  <p className="font-medium text-forest-900">{qi + 1}. {q.prompt}</p>
                  <div className="mt-3 space-y-2">
                    {q.options.map((o, i) => (
                      <button
                        key={i}
                        onClick={() => setAnswers({ ...answers, [q.id]: i })}
                        className={`block w-full rounded-xl border px-3 py-2 text-left text-sm ${
                          answers[q.id] === i ? "border-forest-500 bg-forest-50" : "border-forest-100"
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <button
                className="btn-primary"
                disabled={Object.keys(answers).length < active.questions.length}
                onClick={submit}
              >
                Жіберу және тексеру
              </button>
            </div>
          ) : (
            <div className="card space-y-3">
              <h3 className="font-serif text-xl font-bold">Нәтиже және кері байланыс</h3>
              {active.questions.map((q) => {
                const ok = answers[q.id] === q.answer;
                return (
                  <div key={q.id} className={`rounded-xl p-3 text-sm ${ok ? "bg-forest-50" : "bg-red-50"}`}>
                    <p className="font-medium">{q.prompt}</p>
                    <p>Сіз: {q.options[answers[q.id]]}</p>
                    {!ok && <p>Дұрыс: {q.options[q.answer]}</p>}
                    <p className="text-mountain-600">{q.feedback}</p>
                  </div>
                );
              })}
              <button className="btn-secondary" onClick={() => { setDone(false); setAnswers({}); }}>Қайта бастау</button>
            </div>
          )}
        </div>
      )}
    </div>
    </RequireAuth>
  );
}
