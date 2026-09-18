"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Globe2 } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { setProfile } from "@/lib/storage";
import { getSession } from "@/lib/auth";

export default function LoginPage() {
  const { login, register } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("register");
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
      if (!res.ok) {
        setError(res.error || "Қате");
        return;
      }
      const s = getSession();
      if (s) {
        setProfile({
          name: `${s.aty} ${s.zhoni}`.trim(),
          grade: (s.grade || 8) as 8 | 9,
        });
      }
      router.push(s?.rol === "мұғалім" ? "/mugalim" : "/");
    } else {
      const res = register({
        aty: form.aty,
        zhoni: form.zhoni,
        login: form.login,
        password: form.password,
        rol: form.rol,
        grade: form.rol === "оқушы" ? form.grade : undefined,
      });
      if (!res.ok) {
        setError(res.error || "Қате");
        return;
      }
      if (form.rol === "оқушы") {
        setProfile({ name: `${form.aty} ${form.zhoni}`.trim(), grade: form.grade });
      }
      router.push(form.rol === "мұғалім" ? "/mugalim" : "/");
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="mb-6 flex flex-col items-center text-center">
        <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-700 text-white shadow-soft">
          <Globe2 className="h-6 w-6" />
        </span>
        <h1 className="page-title">Кіру / Тіркелу</h1>
        <p className="mt-2 text-sm text-mountain-600">
          Алғаш рет — «Тіркелу» (өз логин/құпия сөз). Кейін — «Кіру».
        </p>
      </div>
      <div className="flex gap-2 rounded-2xl border border-navy-100 bg-white p-1 shadow-soft">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`flex-1 rounded-xl py-2 text-sm font-semibold transition ${
            mode === "login" ? "bg-navy-700 text-white" : "text-navy-800 hover:bg-sand-50"
          }`}
        >
          Кіру
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          className={`flex-1 rounded-xl py-2 text-sm font-semibold transition ${
            mode === "register" ? "bg-navy-700 text-white" : "text-navy-800 hover:bg-sand-50"
          }`}
        >
          Тіркелу
        </button>
      </div>
      <form onSubmit={onSubmit} className="card mt-4 space-y-3">
        {mode === "register" && (
          <>
            <div>
              <label className="label">Аты</label>
              <input
                className="input-field"
                value={form.aty}
                onChange={(e) => setForm({ ...form, aty: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label">Тегі</label>
              <input
                className="input-field"
                value={form.zhoni}
                onChange={(e) => setForm({ ...form, zhoni: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label">Рөл</label>
              <select
                className="input-field"
                value={form.rol}
                onChange={(e) =>
                  setForm({ ...form, rol: e.target.value as "оқушы" | "мұғалім" })
                }
              >
                <option value="оқушы">Оқушы</option>
                <option value="мұғалім">Мұғалім</option>
              </select>
            </div>
            {form.rol === "оқушы" && (
              <div>
                <label className="label">Сынып</label>
                <select
                  className="input-field"
                  value={form.grade}
                  onChange={(e) =>
                    setForm({ ...form, grade: Number(e.target.value) as 8 | 9 })
                  }
                >
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                </select>
              </div>
            )}
          </>
        )}
        <div>
          <label className="label">Логин</label>
          <input
            className="input-field"
            value={form.login}
            onChange={(e) => setForm({ ...form, login: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="label">Құпия сөз</label>
          <input
            type="password"
            className="input-field"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="btn-primary w-full" type="submit">
          {mode === "login" ? "Кіру" : "Тіркелу"}
        </button>
        <Link href="/" className="block text-center text-sm text-teal-800 hover:text-navy-800">
          Басты бет
        </Link>
      </form>
    </div>
  );
}
