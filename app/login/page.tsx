"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { setProfile } from "@/lib/storage";

export default function LoginPage() {
  const { login, register } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    aty: "",
    zhoni: "",
    login: "",
    password: "",
    rol: "оқушы" as "оқушы" | "мұғалім",
    grade: 8 as 8 | 9,
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (mode === "login") {
      const res = login(form.login, form.password);
      if (!res.ok) { setError(res.error || "Қате"); return; }
      router.push("/");
    } else {
      const res = register({
        aty: form.aty,
        zhoni: form.zhoni,
        login: form.login,
        password: form.password,
        rol: form.rol,
      });
      if (!res.ok) { setError(res.error || "Қате"); return; }
      if (form.rol === "оқушы") {
        setProfile({ name: `${form.aty} ${form.zhoni}`.trim(), grade: form.grade });
      }
      router.push(form.rol === "мұғалім" ? "/mugalim" : "/");
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="page-title text-center">Кіру / Тіркелу</h1>
      <p className="mt-2 text-center text-sm text-mountain-600">localStorage арқылы сақталады</p>
      <div className="mt-6 flex gap-2">
        <button onClick={() => setMode("login")} className={`flex-1 rounded-xl py-2 text-sm font-semibold ${mode === "login" ? "bg-forest-600 text-white" : "bg-white border"}`}>Кіру</button>
        <button onClick={() => setMode("register")} className={`flex-1 rounded-xl py-2 text-sm font-semibold ${mode === "register" ? "bg-forest-600 text-white" : "bg-white border"}`}>Тіркелу</button>
      </div>
      <form onSubmit={onSubmit} className="card mt-4 space-y-3">
        {mode === "register" && (
          <>
            <div>
              <label className="label">Аты</label>
              <input className="input-field" value={form.aty} onChange={(e) => setForm({ ...form, aty: e.target.value })} required />
            </div>
            <div>
              <label className="label">Тегі</label>
              <input className="input-field" value={form.zhoni} onChange={(e) => setForm({ ...form, zhoni: e.target.value })} required />
            </div>
            <div>
              <label className="label">Рөл</label>
              <select className="input-field" value={form.rol} onChange={(e) => setForm({ ...form, rol: e.target.value as "оқушы" | "мұғалім" })}>
                <option value="оқушы">Оқушы</option>
                <option value="мұғалім">Мұғалім</option>
              </select>
            </div>
            {form.rol === "оқушы" && (
              <div>
                <label className="label">Сынып</label>
                <select className="input-field" value={form.grade} onChange={(e) => setForm({ ...form, grade: Number(e.target.value) as 8 | 9 })}>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                </select>
              </div>
            )}
          </>
        )}
        <div>
          <label className="label">Логин</label>
          <input className="input-field" value={form.login} onChange={(e) => setForm({ ...form, login: e.target.value })} required />
        </div>
        <div>
          <label className="label">Құпия сөз</label>
          <input type="password" className="input-field" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="btn-primary w-full" type="submit">{mode === "login" ? "Кіру" : "Тіркелу"}</button>
        <p className="text-center text-xs text-mountain-500">
          Демо: aigul.n / mugalim2024 (мұғалім), erlan.k / okushy2024 (оқушы)
        </p>
        <Link href="/" className="block text-center text-sm text-forest-700">Басты бет</Link>
      </form>
    </div>
  );
}
