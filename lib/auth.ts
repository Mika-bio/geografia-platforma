export type User = {
  id: string;
  aty: string;
  zhoni: string;
  login: string;
  password: string;
  rol: "оқушы" | "мұғалім";
  grade?: 8 | 9;
  createdAt: string;
};

export type SessionUser = Omit<User, "password">;

const STORAGE_KEY = "geopro_users";
const SESSION_KEY = "geopro_session";
const LEGACY = ["geosayahat_users", "geoalemi_users"];
const LEGACY_SESSION = ["geosayahat_session", "geoalemi_session"];
const DEMO_CLEANUP_KEY = "geopro_demo_cleanup_v1";
const KNOWN_DEMO_LOGINS = new Set(["aigul.n", "erlan.k", "dana.s"]);

function isBrowser() {
  return typeof window !== "undefined";
}

function migrateLegacy() {
  if (!isBrowser()) return;
  if (!localStorage.getItem(STORAGE_KEY)) {
    for (const k of LEGACY) {
      const legacy = localStorage.getItem(k);
      if (legacy) {
        localStorage.setItem(STORAGE_KEY, legacy);
        break;
      }
    }
  }
  if (!localStorage.getItem(SESSION_KEY)) {
    for (const k of LEGACY_SESSION) {
      const legacy = localStorage.getItem(k);
      if (legacy) {
        localStorage.setItem(SESSION_KEY, legacy);
        break;
      }
    }
  }
}

/** One-time strip of known demo accounts from stored users. */
function cleanupDemoUsersOnce(users: User[]): User[] {
  if (!isBrowser()) return users;
  if (localStorage.getItem(DEMO_CLEANUP_KEY)) return users;
  const cleaned = users.filter(
    (u) => !KNOWN_DEMO_LOGINS.has(u.login.toLowerCase())
  );
  localStorage.setItem(DEMO_CLEANUP_KEY, "1");
  if (cleaned.length !== users.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      try {
        const s = JSON.parse(session) as SessionUser;
        if (s?.login && KNOWN_DEMO_LOGINS.has(s.login.toLowerCase())) {
          localStorage.removeItem(SESSION_KEY);
        }
      } catch {
        /* ignore */
      }
    }
  }
  return cleaned;
}

/** Load registered users from localStorage only. Empty storage → []. No seeding. */
export function getUsers(): User[] {
  if (!isBrowser()) return [];
  migrateLegacy();
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as User[];
    if (!Array.isArray(parsed)) {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
    return cleanupDemoUsersOnce(parsed);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

export function registerUser(data: {
  aty: string;
  zhoni: string;
  login: string;
  password: string;
  rol: "оқушы" | "мұғалім";
  grade?: 8 | 9;
}): { ok: true; user: User } | { ok: false; error: string } {
  if (!isBrowser()) return { ok: false, error: "Браузер қажет." };
  const users = getUsers();
  if (users.some((u) => u.login.toLowerCase() === data.login.toLowerCase())) {
    return { ok: false, error: "Бұл логин бос емес. Басқасын таңдаңыз." };
  }
  if (data.password.length < 4) {
    return { ok: false, error: "Құпия сөз кемінде 4 таңбадан тұруы керек." };
  }
  if (!data.aty.trim() || !data.zhoni.trim() || !data.login.trim()) {
    return { ok: false, error: "Барлық өрістерді толтырыңыз." };
  }
  const user: User = {
    id: `u${Date.now()}`,
    aty: data.aty.trim(),
    zhoni: data.zhoni.trim(),
    login: data.login.trim(),
    password: data.password,
    rol: data.rol,
    grade: data.grade,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...users, user]));
  setSession(user);
  return { ok: true, user };
}

export function loginUser(
  login: string,
  password: string
): { ok: true; user: User } | { ok: false; error: string } {
  if (!isBrowser()) return { ok: false, error: "Браузер қажет." };
  const users = getUsers();
  const user = users.find(
    (u) =>
      u.login.toLowerCase() === login.toLowerCase() && u.password === password
  );
  if (!user) return { ok: false, error: "Логин немесе құпия сөз қате." };
  setSession(user);
  return { ok: true, user };
}

export function setSession(user: User) {
  if (!isBrowser()) return;
  const safe: SessionUser = {
    id: user.id,
    aty: user.aty,
    zhoni: user.zhoni,
    login: user.login,
    rol: user.rol,
    grade: user.grade,
    createdAt: user.createdAt,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(safe));
}

export function getSession(): SessionUser | null {
  if (!isBrowser()) return null;
  getUsers(); // migrate + optional demo cleanup
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SessionUser;
    if (!parsed?.id || !parsed?.login) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function logout() {
  if (!isBrowser()) return;
  localStorage.removeItem(SESSION_KEY);
}
