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
  loginUser,
  logout as logoutFn,
  registerUser,
  ensureSeedUsers,
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
  }) => { ok: boolean; error?: string };
  logout: () => void;
  refresh: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function toSession(user: {
  id: string;
  aty: string;
  zhoni: string;
  login: string;
  rol: "оқушы" | "мұғалім";
  createdAt: string;
}): SessionUser {
  return {
    id: user.id,
    aty: user.aty,
    zhoni: user.zhoni,
    login: user.login,
    rol: user.rol,
    createdAt: user.createdAt,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    ensureSeedUsers();
    setUser(getSession());
  }, []);

  useEffect(() => {
    refresh();
    setReady(true);

    const onStorage = (e: StorageEvent) => {
      if (
        e.key === "geosayahat_session" ||
        e.key === "geosayahat_users" ||
        e.key === "geoalemi_session" ||
        e.key === "geoalemi_users"
      ) {
        refresh();
      }
    };
    const onFocus = () => refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
    };
  }, [refresh]);

  const login = useCallback((loginName: string, password: string) => {
    const res = loginUser(loginName, password);
    if (res.ok) {
      setUser(toSession(res.user));
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
    }) => {
      const res = registerUser(data);
      if (res.ok) {
        setUser(toSession(res.user));
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
