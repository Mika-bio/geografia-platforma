"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { Mountain, UserPlus, LogIn } from "lucide-react";
import { SEED_USERS } from "@/lib/auth";

export default function LoginPage() {
  const { login, register, user, ready } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    aty: "",
    zhoni: "",
    login: "",
    password: "",
    rol: "оқушы" as "оқушы" | "мұғалім",
  });

  useEffect(() => {
    if (ready && user) router.replace("/dashboard");
  }, [ready, user, router]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (mode === "login") {
      const res = login(form.login, form.password);
      if (!res.ok) setError(res.error || "Қате");
      else router.push("/dashboard");
    } else {
      const res = register(form);
      if (!res.ok) setError(res.error || "Қате");
      else router.push("/dashboard");
    }
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-12 lg:flex-row lg:items-start">
      <div className="flex-1">
        <span className="section-badge">
          <Mountain className="h-3.5 w-3.5" />
          Аккаунт
        </span>
        <h1 className="page-title mt-3">Кіру / Тіркелу</h1>
        <p className="page-subtitle">
          Аты, жөні, логин және құпия сөзбен тіркеліңіз. Деректер браузеріңізде
          сақталады (localStorage).
        </p>

        <div className="mt-8 rounded-2xl border border-forest-100 bg-white/80 p-5 shadow-soft">
          <p className="text-sm font-semibold text-forest-800">Дайын аккаунттар</p>
          <ul className="mt-3 space-y-2 text-sm text-mountain-700">
            {SEED_USERS.map((u) => (
              <li key={u.id} className="rounded-xl bg-forest-50 px-3 py-2">
                <span className="font-medium text-forest-900">
                  {u.aty} {u.zhoni}
                </span>
                {" · "}
                {u.rol}
                <br />
                <span className="text-xs">
                  логин: <code className="rounded bg-white px-1">{u.login}</code> ·
                  құпия сөз: <code className="rounded bg-white px-1">{u.password}</code>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full max-w-md rounded-2xl border border-forest-100 bg-white p-6 shadow-card">
        <div className="mb-6 flex rounded-xl bg-forest-50 p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold ${
              mode === "login" ? "bg-white text-forest-800 shadow-sm" : "text-mountain-600"
            }`}
          >
            <LogIn className="h-4 w-4" />
            Кіру
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold ${
              mode === "register" ? "bg-white text-forest-800 shadow-sm" : "text-mountain-600"
            }`}
          >
            <UserPlus className="h-4 w-4" />
            Тіркелу
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
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
                <label className="label">Жөні</label>
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
                    setForm({
                      ...form,
                      rol: e.target.value as "оқушы" | "мұғалім",
                    })
                  }
                >
                  <option value="оқушы">Оқушы</option>
                  <option value="мұғалім">Мұғалім</option>
                </select>
              </div>
            </>
          )}
          <div>
            <label className="label">Логин</label>
            <input
              className="input-field"
              value={form.login}
              onChange={(e) => setForm({ ...form, login: e.target.value })}
              required
              autoComplete="username"
            />
          </div>
          <div>
            <label className="label">Құпия сөз (пароль)</label>
            <input
              type="password"
              className="input-field"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </div>
          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          <button type="submit" className="btn-primary w-full">
            {mode === "login" ? "Кіру" : "Тіркелу"}
          </button>
        </form>
      </div>
    </div>
  );
}
