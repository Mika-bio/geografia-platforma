"use client";

import { useState } from "react";
import { pisaTasks } from "@/lib/pisa";
import { GraduationCap, CheckCircle2, XCircle, BarChart3 } from "lucide-react";

export default function PisaPage() {
  const [taskIdx, setTaskIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const task = pisaTasks[taskIdx];

  function selectAnswer(qid: string, idx: number) {
    if (submitted) return;
    setAnswers((a) => ({ ...a, [qid]: idx }));
  }

  function submit() {
    setSubmitted(true);
  }

  function nextTask() {
    setSubmitted(false);
    setAnswers({});
    setTaskIdx((i) => (i + 1) % pisaTasks.length);
  }

  const score = task.questions.reduce(
    (acc, q) => acc + (answers[q.id] === q.answer ? 1 : 0),
    0
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <span className="section-badge">
        <GraduationCap className="h-3.5 w-3.5" />
        Географиялық сауаттылық
      </span>
      <h1 className="page-title mt-3">PISA-ға дайындық</h1>
      <p className="page-subtitle">
        График пен картаны түсіндіру, себеп-салдарлық ойлау — PISA стиліндегі
        практикалық тапсырмалар.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {pisaTasks.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setTaskIdx(i);
              setSubmitted(false);
              setAnswers({});
            }}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              i === taskIdx
                ? "bg-forest-600 text-white"
                : "bg-forest-50 text-forest-800 hover:bg-forest-100"
            }`}
          >
            {i + 1}. {t.title}
          </button>
        ))}
      </div>

      <article className="card mt-8">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
            <BarChart3 className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-serif text-2xl font-bold text-forest-900">
              {task.title}
            </h2>
            <p className="mt-2 text-mountain-700 leading-relaxed">{task.context}</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-sky-100 bg-sky-50/80 p-4 text-sm text-sky-900">
          <strong>Диаграмма / карта сипаттамасы:</strong> {task.chartDescription}
        </div>

        <div className="mt-6 space-y-6">
          {task.questions.map((q, qi) => {
            const chosen = answers[q.id];
            const correct = submitted && chosen === q.answer;
            const wrong = submitted && chosen !== undefined && chosen !== q.answer;
            return (
              <div key={q.id} className="rounded-xl border border-forest-100 bg-forest-50/40 p-4">
                <p className="font-medium text-forest-900">
                  {qi + 1}. {q.prompt}
                </p>
                <div className="mt-3 space-y-2">
                  {q.options.map((opt, oi) => (
                    <button
                      key={oi}
                      type="button"
                      onClick={() => selectAnswer(q.id, oi)}
                      className={`flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm transition ${
                        chosen === oi
                          ? "border-forest-500 bg-forest-100"
                          : "border-forest-100 bg-white hover:border-forest-300"
                      } ${
                        submitted && oi === q.answer
                          ? "border-green-500 bg-green-50"
                          : ""
                      } ${wrong && chosen === oi ? "border-red-400 bg-red-50" : ""}`}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-forest-700 border">
                        {String.fromCharCode(65 + oi)}
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>
                {submitted && (
                  <p
                    className={`mt-3 flex items-start gap-2 text-sm ${
                      correct ? "text-green-700" : "text-amber-800"
                    }`}
                  >
                    {correct ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    ) : (
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    )}
                    {q.feedback}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {!submitted ? (
            <button
              type="button"
              onClick={submit}
              className="btn-primary"
              disabled={Object.keys(answers).length < task.questions.length}
            >
              Жауапты тексеру
            </button>
          ) : (
            <>
              <p className="flex items-center rounded-xl bg-forest-100 px-4 py-2 text-sm font-semibold text-forest-800">
                Нәтиже: {score} / {task.questions.length}
              </p>
              <button type="button" onClick={nextTask} className="btn-secondary">
                Келесі тапсырма
              </button>
            </>
          )}
        </div>
      </article>
    </div>
  );
}
