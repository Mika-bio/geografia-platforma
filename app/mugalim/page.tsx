"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { getUsers } from "@/lib/auth";
import {
  Assignment, TeacherClass, exportResultsCsv, getAssignments, getClasses,
  getResults, saveAssignments, saveClasses,
} from "@/lib/storage";

export default function TeacherPage() {
  const { user, ready } = useAuth();
  const router = useRouter();
  const [classes, setClasses] = useState<TeacherClass[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [className, setClassName] = useState("");
  const [classGrade, setClassGrade] = useState<8 | 9>(8);
  const [selectedClass, setSelectedClass] = useState("");
  const [studentId, setStudentId] = useState("");
  const [assignType, setAssignType] = useState<"test" | "olympiad" | "pisa">("test");
  const [assignTitle, setAssignTitle] = useState("");

  useEffect(() => {
    if (!ready) return;
    if (!user) { router.push("/login"); return; }
    if (user.rol !== "мұғалім") { router.push("/"); return; }
    setClasses(getClasses());
    setAssignments(getAssignments());
  }, [ready, user, router]);

  const students = useMemo(() => getUsers().filter((u) => u.rol === "оқушы"), []);
  const results = useMemo(() => getResults(), []);

  const ranking = useMemo(() => {
    const map: Record<string, { name: string; score: number; count: number }> = {};
    results.forEach((r) => {
      const k = r.name;
      if (!map[k]) map[k] = { name: k, score: 0, count: 0 };
      map[k].score += r.score;
      map[k].count += 1;
    });
    return Object.values(map).sort((a, b) => b.score - a.score);
  }, [results]);

  function addClass() {
    if (!className.trim()) return;
    const next = [...classes, { id: `c${Date.now()}`, name: className.trim(), grade: classGrade, studentIds: [] }];
    setClasses(next);
    saveClasses(next);
    setClassName("");
  }

  function addStudentToClass() {
    if (!selectedClass || !studentId) return;
    const next = classes.map((c) =>
      c.id === selectedClass && !c.studentIds.includes(studentId)
        ? { ...c, studentIds: [...c.studentIds, studentId] }
        : c
    );
    setClasses(next);
    saveClasses(next);
  }

  function createAssignment() {
    if (!selectedClass || !assignTitle.trim()) return;
    const next = [
      { id: `a${Date.now()}`, classId: selectedClass, type: assignType, title: assignTitle.trim(), createdAt: new Date().toISOString() },
      ...assignments,
    ];
    setAssignments(next);
    saveAssignments(next);
    setAssignTitle("");
  }

  function downloadCsv() {
    const csv = exportResultsCsv(results);
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "geopro-natizheler.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!ready || !user || user.rol !== "мұғалім") {
    return <div className="p-10 text-center text-mountain-600">Жүктелуде...</div>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <span className="section-badge"><Users className="h-3.5 w-3.5" /> Мұғалім</span>
      <h1 className="page-title mt-3">Мұғалім панелі</h1>
      <p className="page-subtitle">Сыныптар, оқушылар, тапсырмалар, рейтинг, статистика, CSV экспорт.</p>

      <a href="/ji" className="card flex items-center justify-between gap-3 border-horizon-200 bg-gradient-to-r from-horizon-50 to-sky-50 hover:border-horizon-300">
        <div>
          <h2 className="font-serif text-lg font-bold text-forest-900">ЖИ / КМЖ жұмыс орны</h2>
          <p className="text-sm text-mountain-600">Үлгі КМЖ, жоспар жасау және ЖИ көмекші — бір жерде.</p>
        </div>
        <span className="btn-primary shrink-0">Ашу</span>
      </a>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card space-y-3">
          <h2 className="font-serif text-lg font-bold">Сынып қосу</h2>
          <input className="input-field" placeholder="Сынып атауы" value={className} onChange={(e) => setClassName(e.target.value)} />
          <select className="input-field" value={classGrade} onChange={(e) => setClassGrade(Number(e.target.value) as 8 | 9)}>
            <option value={8}>8 сынып</option>
            <option value={9}>9 сынып</option>
          </select>
          <button className="btn-primary" onClick={addClass}>Қосу</button>
          <ul className="space-y-2 text-sm">
            {classes.map((c) => (
              <li key={c.id} className="rounded-lg bg-forest-50 px-3 py-2">
                <button className="font-semibold text-forest-800" onClick={() => setSelectedClass(c.id)}>{c.name}</button>
                <span className="text-mountain-600"> · {c.grade} сынып · {c.studentIds.length} оқушы</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card space-y-3">
          <h2 className="font-serif text-lg font-bold">Оқушыны сыныпқа қосу</h2>
          <select className="input-field" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option value="">Сыныпты таңдаңыз</option>
            {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select className="input-field" value={studentId} onChange={(e) => setStudentId(e.target.value)}>
            <option value="">Оқушы</option>
            {students.map((s) => <option key={s.id} value={s.id}>{s.aty} {s.zhoni} ({s.login})</option>)}
          </select>
          <button className="btn-primary" onClick={addStudentToClass}>Қосу</button>
        </div>

        <div className="card space-y-3">
          <h2 className="font-serif text-lg font-bold">Тапсырма тағайындау</h2>
          <select className="input-field" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option value="">Сынып</option>
            {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select className="input-field" value={assignType} onChange={(e) => setAssignType(e.target.value as "test" | "olympiad" | "pisa")}>
            <option value="test">Тест</option>
            <option value="olympiad">Олимпиада</option>
            <option value="pisa">PISA</option>
          </select>
          <input className="input-field" placeholder="Тапсырма атауы" value={assignTitle} onChange={(e) => setAssignTitle(e.target.value)} />
          <button className="btn-primary" onClick={createAssignment}>Тағайындау</button>
          <ul className="max-h-40 space-y-1 overflow-auto text-sm">
            {assignments.map((a) => (
              <li key={a.id} className="rounded bg-sky-50 px-2 py-1">{a.title} · {a.type}</li>
            ))}
          </ul>
        </div>

        <div className="card space-y-3">
          <h2 className="font-serif text-lg font-bold">Рейтинг және статистика</h2>
          <p className="text-sm text-mountain-600">Нәтиже жазбалары: {results.length}</p>
          <ol className="space-y-1 text-sm">
            {ranking.slice(0, 10).map((r, i) => (
              <li key={r.name} className="flex justify-between rounded-lg border border-forest-100 px-3 py-1.5">
                <span>{i + 1}. {r.name}</span>
                <span className="font-bold">{r.score} ұпай · {r.count} жазба</span>
              </li>
            ))}
            {!ranking.length && <li>Әзірге рейтинг бос.</li>}
          </ol>
          <button className="btn-secondary" onClick={downloadCsv}>CSV / Excel экспорт</button>
        </div>
      </div>
    </div>
  );
}
