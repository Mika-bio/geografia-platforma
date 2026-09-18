"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";

export type QuizItem = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

type Props = {
  items: QuizItem[];
  title?: string;
  onFinish?: (result: {
    correct: number;
    total: number;
    percent: number;
    score: number;
    wrong: { question: string; your?: string; correct: string; explanation: string }[];
  }) => void;
};

export default function QuizEngine({ items, title, onFinish }: Props) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const q = items[idx];
  const total = items.length;

  const result = useMemo(() => {
    if (!done) return null;
    let correct = 0;
    const wrong: { question: string; your?: string; correct: string; explanation: string }[] = [];
    for (const item of items) {
      const a = answers[item.id];
      if (a === item.answer) correct++;
      else {
        wrong.push({
          question: item.question,
          your: a !== undefined ? item.options[a] : "—",
          correct: item.options[item.answer],
          explanation: item.explanation,
        });
      }
    }
    const percent = total ? Math.round((correct / total) * 100) : 0;
    const score = correct * 10;
    return { correct, total, percent, score, wrong };
  }, [done, answers, items, total]);

  function choose(i: number) {
    if (done || !q) return;
    setSelected(i);
  }

  function next() {
    if (selected === null || !q) return;
    const nextAnswers = { ...answers, [q.id]: selected };
    setAnswers(nextAnswers);
    setSelected(null);
    if (idx + 1 >= total) {
      setDone(true);
      let correct = 0;
      const wrong: { question: string; your?: string; correct: string; explanation: string }[] = [];
      for (const item of items) {
        const a = nextAnswers[item.id];
        if (a === item.answer) correct++;
        else {
          wrong.push({
            question: item.question,
            your: a !== undefined ? item.options[a] : "—",
            correct: item.options[item.answer],
            explanation: item.explanation,
          });
        }
      }
      const percent = total ? Math.round((correct / total) * 100) : 0;
      const score = correct * 10;
      onFinish?.({ correct, total, percent, score, wrong });
    } else {
      setIdx(idx + 1);
    }
  }

  function restart() {
    setIdx(0);
    setAnswers({});
    setDone(false);
    setSelected(null);
  }

  if (!items.length) {
    return <p className="text-mountain-600">Сұрақтар жоқ.</p>;
  }

  if (done && result) {
    return (
      <div className="card space-y-4">
        <h2 className="font-serif text-2xl font-bold text-forest-900">
          {title || "Нәтиже"}
        </h2>
        <div className="grid gap-3 sm:grid-cols-4">
          <div className="rounded-xl bg-forest-50 p-4 text-center">
            <div className="text-2xl font-bold text-forest-800">{result.correct}/{result.total}</div>
            <div className="text-xs text-mountain-600">Дұрыс саны</div>
          </div>
          <div className="rounded-xl bg-sky-50 p-4 text-center">
            <div className="text-2xl font-bold text-sky-800">{result.percent}%</div>
            <div className="text-xs text-mountain-600">Пайыз</div>
          </div>
          <div className="rounded-xl bg-horizon-50 p-4 text-center">
            <div className="text-2xl font-bold text-horizon-800">{result.score}</div>
            <div className="text-xs text-mountain-600">Ұпай</div>
          </div>
          <div className="rounded-xl bg-earth-50 p-4 text-center">
            <div className="text-2xl font-bold text-earth-800">{result.wrong.length}</div>
            <div className="text-xs text-mountain-600">Қате</div>
          </div>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-forest-100">
          <div className="h-full rounded-full bg-gradient-to-r from-forest-500 to-sky-500 transition-all" style={{ width: `${result.percent}%` }} />
        </div>
        {result.wrong.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-forest-800">Қателер және түсіндірме</h3>
            {result.wrong.map((w, i) => (
              <div key={i} className="rounded-xl border border-red-100 bg-red-50/50 p-4 text-sm">
                <p className="font-medium text-forest-900">{w.question}</p>
                <p className="mt-1 text-red-700">Сіздің жауабыңыз: {w.your}</p>
                <p className="text-forest-700">Дұрыс жауап: {w.correct}</p>
                <p className="mt-1 text-mountain-600">{w.explanation}</p>
              </div>
            ))}
          </div>
        )}
        <button onClick={restart} className="btn-primary">
          <RotateCcw className="h-4 w-4" /> Қайта бастау
        </button>
      </div>
    );
  }

  return (
    <div className="card space-y-4">
      {title && <h2 className="font-serif text-xl font-bold text-forest-900">{title}</h2>}
      <div className="flex items-center justify-between text-sm text-mountain-600">
        <span>Сұрақ {idx + 1} / {total}</span>
        <div className="h-2 w-40 overflow-hidden rounded-full bg-forest-100">
          <div className="h-full bg-forest-500" style={{ width: `${((idx) / total) * 100}%` }} />
        </div>
      </div>
      <p className="text-lg font-medium text-forest-900">{q.question}</p>
      <div className="space-y-2">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => choose(i)}
            className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
              selected === i
                ? "border-forest-500 bg-forest-50 text-forest-900 ring-2 ring-forest-200"
                : "border-forest-100 bg-white hover:border-forest-300 hover:bg-forest-50/50"
            }`}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-forest-100 text-xs font-bold text-forest-700">
              {String.fromCharCode(65 + i)}
            </span>
            {opt}
          </button>
        ))}
      </div>
      <button onClick={next} disabled={selected === null} className="btn-primary disabled:opacity-40">
        {idx + 1 >= total ? "Аяқтау" : "Келесі"}
      </button>
    </div>
  );
}

export function MiniFeedback({ ok }: { ok: boolean }) {
  return ok ? (
    <CheckCircle2 className="h-5 w-5 text-forest-600" />
  ) : (
    <XCircle className="h-5 w-5 text-red-600" />
  );
}
