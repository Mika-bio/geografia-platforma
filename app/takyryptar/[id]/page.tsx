import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSections, getSectionById, curriculum } from "@/lib/curriculum";
import { ArrowLeft, BookOpen } from "lucide-react";

export function generateStaticParams() {
  return getAllSections().map((s) => ({ id: s.id }));
}

export default function SectionPage({ params }: { params: { id: string } }) {
  const section = getSectionById(params.id);
  if (!section) notFound();

  const cat = curriculum.find((c) => c.id === section.category);
  const siblings = cat?.sections || [];
  const idx = siblings.findIndex((s) => s.id === section.id);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/takyryptar"
        className="inline-flex items-center gap-2 text-sm font-medium text-forest-700 hover:text-forest-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Барлық тақырыптар
      </Link>

      <span className="section-badge mt-6">
        <BookOpen className="h-3.5 w-3.5" />
        {cat?.title || "Тақырып"}
      </span>
      <h1 className="page-title mt-3">{section.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-mountain-700">
        {section.summary}
      </p>

      {section.paragraphs && section.paragraphs.length > 0 && (
        <div className="card mt-8 space-y-3">
          <h2 className="font-serif text-xl font-bold text-forest-900">
            Толығырақ
          </h2>
          {section.paragraphs.map((p, i) => (
            <p key={i} className="leading-relaxed text-mountain-700">
              {p}
            </p>
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/testter" className="btn-secondary">
          Осы тақырып бойынша тест
        </Link>
        <Link href="/ji" className="btn-primary">
          КМЖ / БЖБ жасау
        </Link>
      </div>

      <div className="mt-10 flex justify-between gap-4 border-t border-forest-100 pt-6 text-sm">
        {prev ? (
          <Link href={`/takyryptar/${prev.id}`} className="text-forest-700 hover:underline">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/takyryptar/${next.id}`} className="text-right text-forest-700 hover:underline">
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
