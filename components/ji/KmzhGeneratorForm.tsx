"use client";

import { useMemo, useState } from "react";
import { getTopicsMetaByGrade } from "@/lib/topics-meta";
import { generateKmzhStructured, type KmzhGenerateInput } from "@/lib/kmzh-generator";
import type { KmzhSample } from "@/lib/data/kmzh-samples";
import KmzhViewer from "./KmzhViewer";
import { Sparkles } from "lucide-react";

export default function KmzhGeneratorForm() {
  const [synyp, setSynyp] = useState<8 | 9>(8);
  const [topicId, setTopicId] = useState("");
  const [freeTitle, setFreeTitle] = useState("");
  const [maqsat, setMaqsat] = useState("");
  const [result, setResult] = useState<KmzhSample | null>(null);

  const topics = useMemo(() => getTopicsMetaByGrade(synyp), [synyp]);

  function generate() {
    const selected = topics.find((t) => t.id === topicId);
    const takyryp = freeTitle.trim() || selected?.title || topics[0]?.title || "География тақырыбы";
    const input: KmzhGenerateInput = {
      synyp,
      takyryp,
      topicId: selected?.id || topicId || undefined,
      maqsat: maqsat.trim() || undefined,
    };
    setResult(generateKmzhStructured(input));
  }

  return (
    <div className="space-y-6">
      <div className="card space-y-4">
        <h2 className="font-serif text-xl font-bold text-forest-900">КМЖ жасау</h2>
        <p className="text-sm text-mountain-600">
          Сынып пен тақырыпты таңдаңыз — үлгі құрылымындағы толық КМЖ (~45 мин: Puzzle, ФС, «Адал азамат») жасалады.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="label">Сынып</span>
            <select
              className="input-field"
              value={synyp}
              onChange={(e) => {
                setSynyp(Number(e.target.value) as 8 | 9);
                setTopicId("");
                setResult(null);
              }}
            >
              <option value={8}>8 сынып</option>
              <option value={9}>9 сынып</option>
            </select>
          </label>

          <label className="block">
            <span className="label">Тақырып (тізімнен)</span>
            <select
              className="input-field"
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
            >
              <option value="">— таңдаңыз —</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
          </label>

          <label className="block sm:col-span-2">
            <span className="label">Немесе еркін тақырып</span>
            <input
              className="input-field"
              placeholder="Мысалы: Литосфералық тақталар"
              value={freeTitle}
              onChange={(e) => setFreeTitle(e.target.value)}
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="label">Сабақ мақсаты (міндетті емес)</span>
            <textarea
              className="input-field min-h-[72px]"
              placeholder="Қалдырсаңыз — автоматты түрде құрастырылады"
              value={maqsat}
              onChange={(e) => setMaqsat(e.target.value)}
            />
          </label>
        </div>

        <button type="button" className="btn-primary" onClick={generate}>
          <Sparkles className="h-4 w-4" /> КМЖ құру
        </button>
      </div>

      {result && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-forest-700">Нәтиже — көшіру мен басып шығару қолжетімді:</p>
          <KmzhViewer doc={result} />
        </div>
      )}
    </div>
  );
}
