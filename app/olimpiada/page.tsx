"use client";

import { useMemo, useState } from "react";
import { olympiadQuestions, topicLabels } from "@/lib/olympiad";
import { Trophy, CheckCircle2, XCircle, Lightbulb } from "lucide-react";

type TopicFilter = "all" | "litosfera" | "atmosfera" | "gidrosfera" | "kartografia";

export default function OlimpiadaPage() {
  const [topic, setTopic] = useState<TopicFilter>("all");
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [show, setShow] = useState(false);

  const list = useMemo(() => {
    if (topic === "all") return olympiadQuestions;
    return olympiadQuestions.filter((q) => q.topic === topic);
  }, [topic]);

  const q = list[idx % list.length];

  function changeTopic(t: TopicFilter) {
    setTopic(t);
    setIdx(0);
    setChosen(null);
    setShow(false);
  }

  function check() {
    setShow(true);
  }

  function next() {
    setIdx((i) => (i + 1) % list.length);
    setChosen(null);
    setShow(false);
  }

  if (!q) {
    return <div className="p-12 text-center">Сұрақтар жоқ</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <span className="section-badge">
        <Trophy className="h-3.5 w-3.5" />
        Олимпиада
      </span>
      <h1 className="page-title mt-3">Олимпиадаға дайындық</h1>
      <p className="page-subtitle">
        Көп сатылы, күрделі сұрақтар — литосфера, атмосфера, гидросфера, картография.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {(Object.keys(topicLabels) as TopicFilter[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => changeTopic(t)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              topic === t
                ? "bg-earth-600 text-white"
                : "bg-earth-50 text-earth-900 hover:bg-earth-100"
            }`}
          >
            {topicLabels[t]}
          </button>
        ))}
      </div>

      <article className="card mt-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="rounded-full bg-earth-100 px-2.5 py-1 text-earth-800">
            {topicLabels[q.topic]}
          </span>
          <span className="rounded-full bg-red-50 px-2.5 py-1 text-red-700">
            {q.difficulty}
          </span>
          <span className="text-mountain-500">
            {idx + 1} / {list.length}
          </span>
        </div>

        <h2 className="mt-4 font-serif text-xl font-bold text-forest-900 leading-snug">
          {q.question}
        </h2>

        {q.steps && (
          <div className="mt-4 rounded-xl bg-amber-50 border border-amber-100 p-4">
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-900">
              <Lightbulb className="h-4 w-4" />
              Ойлау қадамдары (кеңес)
            </p>
            <ul className="space-y-1 text-sm text-amber-900/90">
              {q.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-5 space-y-2">
          {q.options.map((opt, oi) => (
            <button
              key={oi}
              type="button"
              onClick={() => !show && setChosen(oi)}
              className={`flex w-full items-start gap-2 rounded-xl border px-3 py-2.5 text-left text-sm ${
                chosen === oi ? "border-earth-500 bg-earth-50" : "border-forest-100 bg-white hover:border-earth-300"
              } ${show && oi === q.answer ? "border-green-500 bg-green-50" : ""}
              ${show && chosen === oi && oi !== q.answer ? "border-red-400 bg-red-50" : ""}`}
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-white text-xs font-bold">
                {String.fromCharCode(65 + oi)}
              </span>
              {opt}
            </button>
          ))}
        </div>

        {show && (
          <p
            className={`mt-4 flex items-start gap-2 rounded-xl p-3 text-sm ${
              chosen === q.answer ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-900"
            }`}
          >
            {chosen === q.answer ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            ) : (
              <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
            )}
            {q.explanation}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {!show ? (
            <button
              type="button"
              className="btn-primary"
              disabled={chosen === null}
              onClick={check}
            >
              Тексеру
            </button>
          ) : (
            <button type="button" className="btn-primary" onClick={next}>
              Келесі сұрақ
            </button>
          )}
        </div>
      </article>
    </div>
  );
}
