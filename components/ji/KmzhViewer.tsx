"use client";

import type { KmzhSample } from "@/lib/data/kmzh-samples";
import { kmzhToPlainText } from "@/lib/kmzh-generator";
import { Copy, Printer, Download } from "lucide-react";
import { useState } from "react";

export default function KmzhViewer({ doc }: { doc: KmzhSample }) {
  const [copied, setCopied] = useState(false);

  async function copyAll() {
    const text = kmzhToPlainText(doc);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function printDoc() {
    window.print();
  }

  return (
    <article className="kmzh-print card space-y-5 print:border-0 print:shadow-none">
      <div className="flex flex-wrap items-start justify-between gap-3 print:hidden">
        <div>
          <span className="section-badge">{doc.synyp} сынып · КМЖ үлгісі</span>
          <h2 className="mt-2 font-serif text-2xl font-bold text-forest-900">{doc.takyryp}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-secondary text-xs" onClick={copyAll}>
            <Copy className="h-3.5 w-3.5" /> {copied ? "Көшірілді" : "Көшіру"}
          </button>
          <button type="button" className="btn-secondary text-xs" onClick={printDoc}>
            <Printer className="h-3.5 w-3.5" /> Басып шығару
          </button>
          {doc.downloadPath && (
            <a className="btn-secondary text-xs" href={doc.downloadPath} download>
              <Download className="h-3.5 w-3.5" /> .txt
            </a>
          )}
        </div>
      </div>

      <div className="grid gap-3 rounded-xl border border-forest-100 bg-forest-50/50 p-4 text-sm sm:grid-cols-2">
        <p><span className="font-semibold text-forest-800">Пән:</span> География</p>
        <p><span className="font-semibold text-forest-800">Сынып:</span> {doc.synyp}</p>
        <p className="sm:col-span-2"><span className="font-semibold text-forest-800">Бөлім:</span> {doc.bolim}</p>
        <p className="sm:col-span-2"><span className="font-semibold text-forest-800">Ішкі бөлім:</span> {doc.bolimKod}</p>
        {doc.qundylyq && (
          <p className="sm:col-span-2"><span className="font-semibold text-forest-800">Құндылық:</span> {doc.qundylyq}</p>
        )}
      </div>

      <section>
        <h3 className="font-serif text-lg font-bold text-forest-800">Оқыту мақсаттары</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-mountain-700">
          {doc.oqytuMaqsattary.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2 text-sm">
        <p><span className="font-semibold text-forest-800">Сабақтың мақсаты:</span> {doc.sabakMaqsaty}</p>
        <p><span className="font-semibold text-forest-800">ЕББҚ:</span> {doc.ebbq}</p>
      </section>

      <section className="space-y-6">
        <h3 className="font-serif text-lg font-bold text-forest-800">Сабақтың барысы (~45 мин)</h3>
        {doc.stages.map((stage) => (
          <div key={stage.id} className="space-y-3">
            <h4 className="rounded-lg bg-gradient-to-r from-forest-600 to-sky-600 px-3 py-1.5 text-sm font-bold text-white">
              {stage.title}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-forest-50">
                    <th className="border border-forest-200 px-2 py-2 w-16">Уақыт</th>
                    <th className="border border-forest-200 px-2 py-2">Педагогтің әрекеті</th>
                    <th className="border border-forest-200 px-2 py-2">Оқушының әрекеті</th>
                    <th className="border border-forest-200 px-2 py-2">Бағалау</th>
                    <th className="border border-forest-200 px-2 py-2">Ресурстар</th>
                  </tr>
                </thead>
                <tbody>
                  {stage.rows.map((row, i) => (
                    <tr key={i} className="align-top odd:bg-white even:bg-mountain-50/40">
                      <td className="border border-forest-200 px-2 py-2 font-semibold text-forest-700 whitespace-nowrap">{row.time}</td>
                      <td className="border border-forest-200 px-2 py-2 text-mountain-800 whitespace-pre-wrap">{row.teacher}</td>
                      <td className="border border-forest-200 px-2 py-2 text-mountain-700 whitespace-pre-wrap">{row.student}</td>
                      <td className="border border-forest-200 px-2 py-2 text-mountain-700 whitespace-pre-wrap">{row.assessment}</td>
                      <td className="border border-forest-200 px-2 py-2 text-sky-800 break-all">{row.resources}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>
    </article>
  );
}
