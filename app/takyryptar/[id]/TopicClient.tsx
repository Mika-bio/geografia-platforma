"use client";
import RequireAuth from "@/components/RequireAuth";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Map as MapIcon } from "lucide-react";
import QuizEngine from "@/components/QuizEngine";
import { Topic } from "@/lib/topics";
import { addResult, getProfile, markTopicCompleted } from "@/lib/storage";

export default function TopicClient({ topic }: { topic: Topic }) {
  const [tab, setTab] = useState<"theory" | "practice" | "map" | "tests">("theory");

  function finish(kind: "practice" | "map" | "tests", result: { correct: number; total: number; percent: number; score: number; wrong: { question: string; your?: string; correct: string; explanation: string }[] }) {
    const profile = getProfile();
    addResult({
      name: profile?.name || "Оқушы",
      grade: (profile?.grade || topic.grade) as 8 | 9,
      type: "topic",
      title: `${topic.title} (${kind})`,
      correct: result.correct,
      total: result.total,
      percent: result.percent,
      score: result.score,
      xp: Math.max(5, Math.round(result.percent / 5)),
      wrong: result.wrong,
      weakTopics: result.percent < 60 ? [topic.title] : [],
    });
    if (kind === "tests") markTopicCompleted(topic.id);
  }

  const tabs = [
    { id: "theory" as const, label: "Теория" },
    { id: "practice" as const, label: `Практика (${topic.practice.length})` },
    { id: "map" as const, label: "Карта" },
    { id: "tests" as const, label: `Тест (${topic.tests.length})` },
  ];

  return (
    <RequireAuth>
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/takyryptar" className="inline-flex items-center gap-2 text-sm font-medium text-forest-700">
        <ArrowLeft className="h-4 w-4" /> Барлық тақырыптар
      </Link>
      <span className="section-badge mt-6">{topic.grade} сынып · {topic.category}</span>
      <h1 className="page-title mt-3">{topic.title}</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === t.id ? "bg-forest-600 text-white" : "border border-forest-200 bg-white"}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "theory" && (
          <div className="card space-y-3 prose-geo">
            <h2>Қысқа теория</h2>
            {topic.theory.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
        {tab === "practice" && (
          <QuizEngine items={topic.practice} title="Практикалық тапсырмалар" onFinish={(r) => finish("practice", r)} />
        )}
        {tab === "map" && (
          <div className="space-y-4">
            <div className="card flex items-center gap-3 bg-sky-50/80">
              <MapIcon className="h-6 w-6 text-sky-700" />
              <p className="text-sm text-sky-900">Карталық сұрақ: картаны елестетіп жауап беріңіз.</p>
            </div>
            <QuizEngine items={[topic.mapTask]} title="Карта тапсырмасы" onFinish={(r) => finish("map", r)} />
          </div>
        )}
        {tab === "tests" && (
          <QuizEngine items={topic.tests} title="Тақырыптық тест" onFinish={(r) => finish("tests", r)} />
        )}
      </div>
    </div>
    </RequireAuth>
  );
}
