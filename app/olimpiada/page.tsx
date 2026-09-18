"use client";
import RequireAuth from "@/components/RequireAuth";

import { useMemo, useState } from "react";
import { Trophy } from "lucide-react";
import QuizEngine from "@/components/QuizEngine";
import { getOlympiadByLevel, levelMeta, OlympiadItem } from "@/lib/olympiad";
import { addResult, getProfile } from "@/lib/storage";

function ExtraVisual({ item }: { item: OlympiadItem }) {
  if (item.chart) {
    const maxT = Math.max(...item.chart.temp.map(Math.abs), 1);
    const maxP = Math.max(...item.chart.precip, 1);
    return (
      <div className="mb-4 rounded-xl border border-sky-100 bg-sky-50/60 p-4">
        <p className="mb-2 text-xs font-semibold text-sky-800">Климат диаграммасы (SVG)</p>
        <svg viewBox="0 0 320 120" className="h-28 w-full">
          {item.chart.months.map((m, i) => {
            const x = 40 + i * 70;
            const h = (item.chart!.precip[i] / maxP) * 50;
            const ty = 60 - (item.chart!.temp[i] / maxT) * 40;
            return (
              <g key={m}>
                <rect x={x} y={100 - h} width={24} height={h} fill="#7bc69a" opacity={0.8} />
                <circle cx={x + 12} cy={ty} r={4} fill="#2f83bd" />
                <text x={x + 12} y={115} textAnchor="middle" fontSize="10" fill="#40495e">{m}</text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }
  if (item.table) {
    return (
      <div className="mb-4 overflow-x-auto rounded-xl border border-forest-100">
        <table className="w-full text-sm">
          <thead className="bg-forest-50">
            <tr>{item.table.headers.map((h) => <th key={h} className="px-3 py-2 text-left">{h}</th>)}</tr>
          </thead>
          <tbody>
            {item.table.rows.map((r, i) => (
              <tr key={i} className="border-t border-forest-100">
                {r.map((c, j) => <td key={j} className="px-3 py-2">{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
}

export default function OlympiadPage() {
  const [level, setLevel] = useState<1 | 2 | 3 | null>(null);
  const items = useMemo(() => (level ? getOlympiadByLevel(level) : []), [level]);

  // Enrich questions text with type tag already in data
  const quizItems = items.map((it) => ({
    id: it.id,
    question: `[${it.type}] ${it.question}`,
    options: it.options,
    answer: it.answer,
    explanation: it.explanation,
  }));

  function onFinish(result: { correct: number; total: number; percent: number; score: number; wrong: { question: string; your?: string; correct: string; explanation: string }[] }) {
    const profile = getProfile();
    addResult({
      name: profile?.name || "Оқушы",
      grade: profile?.grade || 8,
      type: "olympiad",
      title: `Олимпиада · деңгей ${level}`,
      correct: result.correct,
      total: result.total,
      percent: result.percent,
      score: result.score,
      xp: Math.max(15, Math.round(result.percent / 3)),
      wrong: result.wrong,
    });
  }

  return (
    <RequireAuth>
    <div className="mx-auto max-w-4xl px-4 py-10">
      <span className="section-badge"><Trophy className="h-3.5 w-3.5" /> Олимпиада</span>
      <h1 className="page-title mt-3">Олимпиадаға дайындық</h1>
      <p className="page-subtitle">
        Үш деңгей: карта, координаталар, масштаб, қашықтық, уақыт белдеулері, климат диаграммалары,
        кестелер, салыстыру, себеп-салдар, көп дұрыс, логика.
      </p>

      {!level ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {levelMeta.map((l) => (
            <button key={l.level} onClick={() => setLevel(l.level)} className="card text-left">
              <p className="text-xs font-bold uppercase text-horizon-700">Деңгей {l.level}</p>
              <h2 className="mt-1 font-serif text-xl font-bold text-forest-900">{l.title}</h2>
              <p className="mt-2 text-sm text-mountain-600">{l.desc}</p>
              <p className="mt-3 text-xs text-forest-700">{getOlympiadByLevel(l.level).length} тапсырма</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          <button className="btn-secondary" onClick={() => setLevel(null)}>← Деңгейлер</button>
          {items[0] && <ExtraVisual item={items.find((i) => i.chart || i.table) || items[0]} />}
          <div className="flex flex-wrap gap-2 text-xs">
            {Array.from(new Set(items.map((i) => i.type))).map((t) => (
              <span key={t} className="rounded-full bg-forest-100 px-2 py-1 font-semibold text-forest-800">{t}</span>
            ))}
          </div>
          <QuizEngine items={quizItems} title={levelMeta[level - 1].title} onFinish={onFinish} />
        </div>
      )}
    </div>
    </RequireAuth>
  );
}
