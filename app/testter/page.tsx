"use client";

import { useMemo, useState } from "react";
import {
  categoryLabels,
  getQuestionsByCategory,
  QuizQuestion,
} from "@/lib/quiz";
import { ClipboardList, CheckCircle2, XCircle, RotateCcw } from "lucide-react";


export default function TestterPage() {
  const [cat, setCat] = useState<string>("all");
  const [started, setStarted] = useState(false);
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);

  const questions = useMemo(() => getQuestionsByCategory(cat), [cat]);
  const current: QuizQuestion | undefined = questions[qi];

  function start() {
    setStarted(true);
    setQi(0);
    setAnswers({});
    setFinished(false);
  }

  function choose(optIdx: number) {
    if (!current || finished) return;
    setAnswers((a) => ({ ...a, [current.id]: optIdx }));
  }

  function next() {
    if (qi + 1 >= questions.length) {
      setFinished(true);
    } else {
      setQi((i) => i + 1);
    }
  }

  const score = questions.reduce(
    (acc, q) => acc + (answers[q.id] === q.answer ? 1 : 0),
    0
  );
  const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <span className="section-badge">
        <ClipboardList className="h-3.5 w-3.5" />
        Бағалау
      </span>
      <h1 className="page-title mt-3">Тесттер</h1>
      <p className="page-subtitle">
        {questions.length}+ сұрақ оқулық тақырыптары бойынша. Қате жауапқа қысқа
        түсіндірме — «қатемен жұмыс» стилінде.
      </p>

      {!started ? (
        <div className="card mt-8 space-y-4">
          <div>
            <label className="label">Бөлімді таңдаңыз</label>
            <select
              className="input-field"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            >
              {Object.entries(categoryLabels).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <p className="text-sm text-mountain-600">
            Сұрақ саны: <strong>{questions.length}</strong>
          </p>
          <button type="button" className="btn-primary" onClick={start}>
            Тестті бастау
          </button>
        </div>
      ) : finished ? (
        <div className="card mt-8">
          <h2 className="font-serif text-2xl font-bold text-forest-900">
            Нәтиже: {score} / {questions.length} ({pct}%)
          </h2>
          <p className="mt-2 text-mountain-600">
            {pct >= 80
              ? "Өте жақсы! Тақырыпты жақсы меңгергенсіз."
              : pct >= 60
                ? "Жақсы нәтиже. Қателерді қайталау ұсынылады."
                : "Қайталап оқып, қатемен жұмыс жасаңыз."}
          </p>

          <div className="mt-6 space-y-4">
            <h3 className="font-semibold text-forest-800">Қатемен жұмыс</h3>
            {questions.map((q, i) => {
              const ok = answers[q.id] === q.answer;
              if (ok) return null;
              return (
                <div
                  key={q.id}
                  className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm"
                >
                  <p className="font-medium text-amber-950">
                    {i + 1}. {q.question}
                  </p>
                  <p className="mt-1 text-red-700">
                    Сіздің жауабыңыз: {q.options[answers[q.id]] ?? "—"}
                  </p>
                  <p className="mt-1 text-green-800">
                    Дұрыс: {q.options[q.answer]}
                  </p>
                  <p className="mt-2 text-amber-900">{q.explanation}</p>
                </div>
              );
            })}
            {score === questions.length && (
              <p className="text-green-700">Барлық жауап дұрыс — қате жоқ!</p>
            )}
          </div>

          <button
            type="button"
            className="btn-secondary mt-6"
            onClick={() => {
              setStarted(false);
              setFinished(false);
            }}
          >
            <RotateCcw className="h-4 w-4" />
            Қайта бастау
          </button>
        </div>
      ) : current ? (
        <div className="card mt-8">
          <div className="mb-4 flex items-center justify-between text-sm text-mountain-600">
            <span>
              Сұрақ {qi + 1} / {questions.length}
            </span>
            <span>{categoryLabels[current.category] || current.category}</span>
          </div>
          <div className="mb-4 h-2 overflow-hidden rounded-full bg-forest-100">
            <div
              className="h-full bg-forest-500 transition-all"
              style={{ width: `${((qi + 1) / questions.length) * 100}%` }}
            />
          </div>

          <h2 className="font-serif text-xl font-bold text-forest-900">
            {current.question}
          </h2>

          <div className="mt-5 space-y-2">
            {current.options.map((opt, oi) => {
              const selected = answers[current.id] === oi;
              const revealed = answers[current.id] !== undefined;
              const isCorrect = oi === current.answer;
              return (
                <button
                  key={oi}
                  type="button"
                  onClick={() => choose(oi)}
                  className={`flex w-full items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm ${
                    selected ? "border-forest-500 bg-forest-50" : "border-forest-100 bg-white hover:border-forest-300"
                  } ${revealed && isCorrect ? "border-green-500 bg-green-50" : ""}
                  ${revealed && selected && !isCorrect ? "border-red-400 bg-red-50" : ""}`}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-white text-xs font-bold">
                    {String.fromCharCode(65 + oi)}
                  </span>
                  {opt}
                  {revealed && isCorrect && (
                    <CheckCircle2 className="ml-auto h-4 w-4 text-green-600" />
                  )}
                  {revealed && selected && !isCorrect && (
                    <XCircle className="ml-auto h-4 w-4 text-red-500" />
                  )}
                </button>
              );
            })}
          </div>

          {answers[current.id] !== undefined && (
            <p
              className={`mt-4 rounded-xl p-3 text-sm ${
                answers[current.id] === current.answer
                  ? "bg-green-50 text-green-800"
                  : "bg-amber-50 text-amber-900"
              }`}
            >
              {current.explanation}
            </p>
          )}

          <button
            type="button"
            className="btn-primary mt-6"
            disabled={answers[current.id] === undefined}
            onClick={next}
          >
            {qi + 1 >= questions.length ? "Нәтижені көру" : "Келесі"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
