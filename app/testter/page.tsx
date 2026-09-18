"use client";

import { useEffect, useMemo, useState } from "react";
import { ClipboardList } from "lucide-react";
import QuizEngine from "@/components/QuizEngine";
import { getTests } from "@/lib/tests";
import { addResult, getProfile } from "@/lib/storage";

export default function TestsPage() {
  const [grade, setGrade] = useState<8 | 9>(8);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(20);

  useEffect(() => {
    const p = getProfile();
    if (p?.grade) setGrade(p.grade);
  }, []);

  const bank = getTests(grade);
  const items = useMemo(() => {
    const shuffled = [...bank].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, bank.length));
  // reshuffle when started toggles
  }, [bank, count, started]); // eslint-disable-line react-hooks/exhaustive-deps

  function onFinish(result: { correct: number; total: number; percent: number; score: number; wrong: { question: string; your?: string; correct: string; explanation: string }[] }) {
    const profile = getProfile();
    addResult({
      name: profile?.name || "Оқушы",
      grade,
      type: "test",
      title: `${grade} сынып тесті (${result.total} сұрақ)`,
      correct: result.correct,
      total: result.total,
      percent: result.percent,
      score: result.score,
      xp: Math.max(10, Math.round(result.percent / 4)),
      wrong: result.wrong,
    });
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <span className="section-badge"><ClipboardList className="h-3.5 w-3.5" /> Тесттер</span>
      <h1 className="page-title mt-3">Тест банктері</h1>
      <p className="page-subtitle">
        8 сынып: {getTests(8).length} сұрақ · 9 сынып: {getTests(9).length} сұрақ. 4 нұсқа, 1 дұрыс.
      </p>

      {!started ? (
        <div className="card mt-8 space-y-4">
          <div className="flex gap-2">
            {[8, 9].map((g) => (
              <button key={g} onClick={() => setGrade(g as 8 | 9)} className={`flex-1 rounded-xl border px-3 py-3 font-semibold ${grade === g ? "border-forest-500 bg-forest-50" : "border-forest-100"}`}>
                {g} сынып ({getTests(g as 8 | 9).length})
              </button>
            ))}
          </div>
          <label className="label">Сұрақ саны</label>
          <select className="input-field" value={count} onChange={(e) => setCount(Number(e.target.value))}>
            {[10, 20, 40, 50, 100].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <button className="btn-primary w-full" onClick={() => setStarted(true)}>Тестті бастау</button>
        </div>
      ) : (
        <div className="mt-8">
          <QuizEngine
            key={`${grade}-${count}-${started}`}
            items={items}
            title={`${grade} сынып · ${items.length} сұрақ`}
            onFinish={onFinish}
          />
          <button className="btn-secondary mt-4" onClick={() => setStarted(false)}>Басқа тест таңдау</button>
        </div>
      )}
    </div>
  );
}
