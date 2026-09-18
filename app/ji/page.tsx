"use client";

import { useState } from "react";
import { BookOpen, FilePlus2, MessageSquareText, Sparkles } from "lucide-react";
import { kmzhSamples } from "@/lib/data/kmzh-samples";
import KmzhViewer from "@/components/ji/KmzhViewer";
import KmzhGeneratorForm from "@/components/ji/KmzhGeneratorForm";
import JiChat from "@/components/ji/JiChat";

type Tab = "ulgiler" | "jasau" | "ji";

export default function JiPage() {
  const [tab, setTab] = useState<Tab>("ulgiler");
  const [sampleId, setSampleId] = useState(kmzhSamples[0]?.id || "");

  const sample = kmzhSamples.find((s) => s.id === sampleId) || kmzhSamples[0];

  const tabs: { id: Tab; label: string; icon: typeof BookOpen }[] = [
    { id: "ulgiler", label: "КМЖ үлгілері", icon: BookOpen },
    { id: "jasau", label: "КМЖ жасау", icon: FilePlus2 },
    { id: "ji", label: "ЖИ көмекші", icon: MessageSquareText },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <div>
        <span className="section-badge">
          <Sparkles className="h-3.5 w-3.5" /> ЖИ / КМЖ
        </span>
        <h1 className="page-title mt-3">ЖИ және КМЖ жұмыс орны</h1>
        <p className="page-subtitle">
          Үлгі КМЖ-ларды қараңыз, жаңа жоспар құрыңыз және кез келген география
          тапсырмасына ЖИ арқылы жауап алыңыз.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 print:hidden">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "bg-gradient-to-r from-forest-600 to-sky-600 text-white shadow-soft"
                  : "border border-forest-200 bg-white text-forest-800 hover:bg-forest-50"
              }`}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === "ulgiler" && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 print:hidden">
            {kmzhSamples.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSampleId(s.id)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  sampleId === s.id
                    ? "bg-forest-700 text-white"
                    : "bg-forest-50 text-forest-800 hover:bg-forest-100"
                }`}
              >
                {s.synyp} сынып — {s.takyryp}
              </button>
            ))}
          </div>
          {sample && <KmzhViewer doc={sample} />}
        </div>
      )}

      {tab === "jasau" && <KmzhGeneratorForm />}

      {tab === "ji" && <JiChat />}
    </div>
  );
}
