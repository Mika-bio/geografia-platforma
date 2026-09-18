"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  SessionUser,
  getSession,
  getUsers,
  loginUser,
  logout as logoutFn,
  registerUser,
} from "@/lib/auth";

type AuthContextValue = {
  user: SessionUser | null;
  ready: boolean;
  login: (login: string, password: string) => { ok: boolean; error?: string };
  register: (data: {
    aty: string;
    zhoni: string;
    login: string;
    password: string;
    rol: "оқушы" | "мұғалім";
    grade?: 8 | 9;
  }) => { ok: boolean; error?: string };
  logout: () => void;
  refresh: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    getUsers();
    setUser(getSession());
  }, []);

  useEffect(() => {
    refresh();
    setReady(true);
  }, [refresh]);

  const login = useCallback((loginName: string, password: string) => {
    const res = loginUser(loginName, password);
    if (res.ok) {
      setUser({
        id: res.user.id,
        aty: res.user.aty,
        zhoni: res.user.zhoni,
        login: res.user.login,
        rol: res.user.rol,
        grade: res.user.grade,
        createdAt: res.user.createdAt,
      });
      return { ok: true };
    }
    return { ok: false, error: res.error };
  }, []);

  const register = useCallback(
    (data: {
      aty: string;
      zhoni: string;
      login: string;
      password: string;
      rol: "оқушы" | "мұғалім";
      grade?: 8 | 9;
    }) => {
      const res = registerUser(data);
      if (res.ok) {
        setUser({
          id: res.user.id,
          aty: res.user.aty,
          zhoni: res.user.zhoni,
          login: res.user.login,
          rol: res.user.rol,
          grade: res.user.grade,
          createdAt: res.user.createdAt,
        });
        return { ok: true };
      }
      return { ok: false, error: res.error };
    },
    []
  );

  const logout = useCallback(() => {
    logoutFn();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, ready, login, register, logout, refresh }),
    [user, ready, login, register, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
