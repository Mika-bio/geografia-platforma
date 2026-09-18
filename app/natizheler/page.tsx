"use client";
import RequireAuth from "@/components/RequireAuth";

import { useEffect, useMemo, useState } from "react";
import { BarChart3 } from "lucide-react";
import RewardsBar from "@/components/RewardsBar";
import { getResults, ResultEntry, getCompletedTopics, getProfile } from "@/lib/storage";
import { topicsGrade8, topicsGrade9 } from "@/lib/topics";

export default function ResultsPage() {
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    setResults(getResults());
    setCompleted(getCompletedTopics());
    setName(getProfile()?.name || "");
  }, []);

  const stats = useMemo(() => {
    const byType = (t: string) => results.filter((r) => r.type === t);
    const avg = (arr: ResultEntry[]) => (arr.length ? Math.round(arr.reduce((s, r) => s + r.percent, 0) / arr.length) : 0);
    const weak: Record<string, number> = {};
    results.forEach((r) => (r.weakTopics || []).forEach((w) => { weak[w] = (weak[w] || 0) + 1; }));
    const weakList = Object.entries(weak).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const totalScore = results.reduce((s, r) => s + r.score, 0);
    return {
      totalScore,
      tests: byType("test"),
      olympiad: byType("olympiad"),
      pisa: byType("pisa"),
      avgTest: avg(byType("test")),
      avgOl: avg(byType("olympiad")),
      avgPisa: avg(byType("pisa")),
      weakList,
      completed: completed.length,
      totalTopics: topicsGrade8.length + topicsGrade9.length,
    };
  }, [results, completed]);

  const chart = [
    { label: "Тест", value: stats.avgTest },
    { label: "Олимпиада", value: stats.avgOl },
    { label: "PISA", value: stats.avgPisa },
  ];

  return (
    <RequireAuth>
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <span className="section-badge"><BarChart3 className="h-3.5 w-3.5" /> Нәтижелер</span>
      <h1 className="page-title mt-3">Менің нәтижелерім{name ? `: ${name}` : ""}</h1>
      <RewardsBar />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card text-center"><div className="text-2xl font-bold text-forest-800">{stats.totalScore}</div><div className="text-xs text-mountain-600">Жалпы ұпай</div></div>
        <div className="card text-center"><div className="text-2xl font-bold text-sky-800">{stats.tests.length}</div><div className="text-xs">Тесттер · орташа {stats.avgTest}%</div></div>
        <div className="card text-center"><div className="text-2xl font-bold text-horizon-800">{stats.olympiad.length}</div><div className="text-xs">Олимпиада · {stats.avgOl}%</div></div>
        <div className="card text-center"><div className="text-2xl font-bold text-earth-800">{stats.pisa.length}</div><div className="text-xs">PISA · {stats.avgPisa}%</div></div>
      </div>

      <div className="card">
        <h2 className="font-serif text-lg font-bold">Прогресс диаграммасы</h2>
        <p className="text-sm text-mountain-600">Аяқталған тақырыптар: {stats.completed} / {stats.totalTopics}</p>
        <div className="mt-4 flex h-40 items-end gap-6">
          {chart.map((c) => (
            <div key={c.label} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-sm font-bold">{c.value}%</span>
              <div className="w-full max-w-[80px] rounded-t-xl bg-gradient-to-t from-forest-600 to-sky-400 transition-all" style={{ height: `${Math.max(8, c.value)}%` }} />
              <span className="text-xs text-mountain-600">{c.label}</span>
            </div>
          ))}
        </div>
        <svg viewBox="0 0 300 60" className="mt-4 h-14 w-full">
          <polyline fill="none" stroke="#2f9159" strokeWidth="3"
            points={results.slice(0, 10).reverse().map((r, i) => `${20 + i * 28},${55 - r.percent * 0.45}`).join(" ")} />
        </svg>
      </div>

      <div className="card">
        <h2 className="font-serif text-lg font-bold">Әлсіз тақырыптар</h2>
        {stats.weakList.length === 0 ? (
          <p className="mt-2 text-sm text-mountain-600">Әзірге дерек аз — тест/тақырыптан кейін пайда болады.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {stats.weakList.map(([t, n]) => (
              <li key={t} className="flex justify-between rounded-lg bg-red-50 px-3 py-2 text-sm">
                <span>{t}</span><span className="font-semibold text-red-700">{n}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h2 className="font-serif text-lg font-bold">Соңғы нәтижелер</h2>
        <div className="mt-3 space-y-2">
          {results.slice(0, 20).map((r) => (
            <div key={r.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-forest-100 px-3 py-2 text-sm">
              <div>
                <p className="font-medium text-forest-900">{r.title}</p>
                <p className="text-xs text-mountain-500">{r.type} · {new Date(r.at).toLocaleString("kk-KZ")}</p>
              </div>
              <div className="font-bold text-forest-700">{r.percent}% · {r.correct}/{r.total}</div>
            </div>
          ))}
          {!results.length && <p className="text-sm text-mountain-600">Нәтижелер әлі жоқ.</p>}
        </div>
      </div>
    </div>
    </RequireAuth>
  );
}
