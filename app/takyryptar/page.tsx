import Link from "next/link";
import { curriculum } from "@/lib/curriculum";
import { BookOpen } from "lucide-react";

const tint: Record<string, string> = {
  forest: "border-forest-200 bg-forest-50/80",
  earth: "border-earth-200 bg-earth-50/80",
  sky: "border-sky-200 bg-sky-50/80",
  mountain: "border-mountain-200 bg-mountain-50/80",
};

export default function TakyryptarPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <span className="section-badge">
        <BookOpen className="h-3.5 w-3.5" />
        Оқулық мазмұны
      </span>
      <h1 className="page-title mt-3">Тақырыптар</h1>
      <p className="page-subtitle">
        Кіріспеден терминдер сөздігіне дейін — әр § бойынша қысқаша қазақша шолу.
      </p>

      <div className="mt-10 space-y-10">
        {curriculum.map((cat) => (
          <section key={cat.id}>
            <div className={`rounded-2xl border p-5 ${tint[cat.color] || tint.forest}`}>
              <h2 className="font-serif text-2xl font-bold text-forest-900">
                {cat.title}
              </h2>
              <p className="mt-1 text-sm text-mountain-700">{cat.description}</p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {cat.sections.map((s) => (
                <Link
                  key={s.id}
                  href={`/takyryptar/${s.id}`}
                  className="rounded-xl border border-forest-100 bg-white p-4 shadow-soft transition hover:border-forest-300 hover:shadow-card"
                >
                  <h3 className="font-serif font-bold text-forest-900">{s.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-mountain-600">
                    {s.summary}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
