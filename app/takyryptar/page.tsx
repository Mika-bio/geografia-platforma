"use client";
import RequireAuth from "@/components/RequireAuth";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { getTopicsByGrade } from "@/lib/topics";
import { getCompletedTopics, getProfile } from "@/lib/storage";

export default function TopicsPage() {
  const [grade, setGrade] = useState<8 | 9>(8);
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    const p = getProfile();
    if (p?.grade) setGrade(p.grade);
    setDone(getCompletedTopics());
  }, []);

  const topics = getTopicsByGrade(grade);

  return (
    <RequireAuth>
    <div className="mx-auto max-w-7xl px-4 py-10">
      <span className="section-badge"><BookOpen className="h-3.5 w-3.5" /> Тақырыптар</span>
      <h1 className="page-title mt-3">Тақырыптар · {grade} сынып</h1>
      <p className="page-subtitle">Әр тақырыпта: теория, 12 практика, карта тапсырмасы, 5 тест.</p>

      <div className="mt-6 flex gap-2">
        {[8, 9].map((g) => (
          <button key={g} onClick={() => setGrade(g as 8 | 9)} className={`rounded-full px-4 py-2 text-sm font-semibold ${grade === g ? "bg-forest-600 text-white" : "bg-white text-forest-800 border border-forest-200"}`}>
            {g} сынып ({g === 8 ? 25 : 27})
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((t, i) => (
          <Link key={t.id} href={`/takyryptar/${t.id}`} className="card block">
            <div className="flex items-start justify-between gap-2">
              <span className="rounded-lg bg-forest-100 px-2 py-0.5 text-xs font-bold text-forest-700">{i + 1}</span>
              {done.includes(t.id) && <span className="text-xs font-semibold text-forest-600">✓ Аяқталды</span>}
            </div>
            <h2 className="mt-2 font-serif text-base font-bold text-forest-900">{t.title}</h2>
            <p className="mt-1 text-xs text-mountain-500">{t.category} · теория + практика + карта + тест</p>
          </Link>
        ))}
      </div>
    </div>
    </RequireAuth>
  );
}
