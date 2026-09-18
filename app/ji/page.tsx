"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { getAllSections } from "@/lib/curriculum";
import { DocType, generateDocument } from "@/lib/ai-generator";
import { Sparkles, Copy, Download, Check } from "lucide-react";

export default function JiPage() {
  const sections = useMemo(() => getAllSections(), []);
  const [synyp, setSynyp] = useState<"8" | "9">("8");
  const [sectionId, setSectionId] = useState(sections[1]?.id || sections[0]?.id || "s1");
  const [sabakSany, setSabakSany] = useState(3);
  const [maqsat, setMaqsat] = useState("");
  const [docType, setDocType] = useState<DocType>("КМЖ");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  function handleGenerate() {
    const text = generateDocument({
      synyp,
      sectionId,
      sabakSany,
      maqsat,
      docType,
    });
    setResult(text);
    setCopied(false);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([result], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${docType}-${synyp}-synyp.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function renderMarkdown(md: string) {
    const lines = md.split("\n");
    const nodes: ReactNode[] = [];
    let tableRows: string[][] = [];
    let inTable = false;

    const flushTable = () => {
      if (tableRows.length === 0) return;
      const header = tableRows[0];
      const body = tableRows.slice(2);
      nodes.push(
        <table key={`t-${nodes.length}`} className="mb-4 w-full text-sm">
          <thead>
            <tr>
              {header.map((c, i) => (
                <th key={i} className="border border-forest-200 bg-forest-50 px-3 py-2 text-left">
                  {c.trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri}>
                {row.map((c, ci) => (
                  <td key={ci} className="border border-forest-200 px-3 py-2">
                    {c.trim()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
      tableRows = [];
      inTable = false;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith("|")) {
        inTable = true;
        tableRows.push(
          line.split("|").filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
        );
        continue;
      }
      if (inTable) flushTable();

      if (line.startsWith("# ")) {
        nodes.push(
          <h1 key={i} className="mb-4 font-serif text-2xl font-bold text-forest-900">
            {line.slice(2)}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        nodes.push(
          <h2 key={i} className="mb-3 mt-6 font-serif text-xl font-bold text-forest-800">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        nodes.push(
          <h3 key={i} className="mb-2 mt-4 font-serif text-lg font-semibold text-forest-700">
            {line.slice(4)}
          </h3>
        );
      } else if (line.startsWith("---")) {
        nodes.push(<hr key={i} className="my-6 border-forest-200" />);
      } else if (line.startsWith("- ") || line.startsWith("| Деңгей")) {
        nodes.push(
          <li key={i} className="ml-5 list-disc text-mountain-700">
            {line.replace(/^- /, "")}
          </li>
        );
      } else if (line.trim() === "") {
        nodes.push(<div key={i} className="h-2" />);
      } else {
        const cleaned = line
          .replace(/\*\*(.*?)\*\*/g, "$1")
          .replace(/\*(.*?)\*/g, "$1");
        nodes.push(
          <p key={i} className="mb-2 leading-relaxed text-mountain-700">
            {cleaned}
          </p>
        );
      }
    }
    if (inTable) flushTable();
    return nodes;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <span className="section-badge">
        <Sparkles className="h-3.5 w-3.5" />
        Жасанды интеллект
      </span>
      <h1 className="page-title mt-3">ЖИ: КМЖ / БЖБ / ТЖБ жасау</h1>
      <p className="page-subtitle">
        Сынып пен тақырыпты таңдап, қысқа мерзімді жоспар немесе бағалау құжатын
        бірден алыңыз. Сыртқы API қажет емес — құрылымды үлгі негізінде жасалады.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        <div className="card lg:col-span-2 space-y-4">
          <div>
            <label className="label">Құжат түрі</label>
            <div className="flex flex-wrap gap-2">
              {(["КМЖ", "БЖБ", "ТЖБ"] as DocType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setDocType(t)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    docType === t
                      ? "bg-forest-600 text-white"
                      : "bg-forest-50 text-forest-800 hover:bg-forest-100"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label">Сынып</label>
            <select
              className="input-field"
              value={synyp}
              onChange={(e) => setSynyp(e.target.value as "8" | "9")}
            >
              <option value="8">8 сынып</option>
              <option value="9">9 сынып</option>
            </select>
          </div>
          <div>
            <label className="label">Тақырып (§)</label>
            <select
              className="input-field"
              value={sectionId}
              onChange={(e) => setSectionId(e.target.value)}
            >
              {sections.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Сабақ саны (КМЖ үшін)</label>
            <input
              type="number"
              min={1}
              max={12}
              className="input-field"
              value={sabakSany}
              onChange={(e) => setSabakSany(Number(e.target.value) || 1)}
            />
          </div>
          <div>
            <label className="label">Сабақ / бағалау мақсаты</label>
            <textarea
              className="input-field min-h-[80px]"
              placeholder="Мысалы: Литосфералық тақталарды картадан анықтау дағдысын қалыптастыру"
              value={maqsat}
              onChange={(e) => setMaqsat(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleGenerate} className="btn-primary w-full">
            <Sparkles className="h-4 w-4" />
            Жасау
          </button>
        </div>

        <div className="lg:col-span-3">
          {result ? (
            <div className="rounded-2xl border border-forest-100 bg-white p-6 shadow-card">
              <div className="mb-4 flex flex-wrap gap-2">
                <button type="button" onClick={handleCopy} className="btn-secondary">
                  {copied ? <Check className="h-4 w-4 text-forest-600" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Көшірілді" : "Көшіру"}
                </button>
                <button type="button" onClick={handleDownload} className="btn-secondary">
                  <Download className="h-4 w-4" />
                  Жүктеу (.md)
                </button>
              </div>
              <div className="max-h-[70vh] overflow-y-auto pr-2">{renderMarkdown(result)}</div>
            </div>
          ) : (
            <div className="flex h-full min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-forest-200 bg-forest-50/50 p-8 text-center text-mountain-600">
              Форманы толтырып, «Жасау» батырмасын басыңыз — нәтиже осында шығады.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
