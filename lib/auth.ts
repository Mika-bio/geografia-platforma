export type User = {
  id: string;
  aty: string;
  zhoni: string;
  login: string;
  password: string;
  rol: "оқушы" | "мұғалім";
  createdAt: string;
};

export type SessionUser = Omit<User, "password">;

const STORAGE_KEY = "geoalemi_users";
const SESSION_KEY = "geoalemi_session";

export const SEED_USERS: User[] = [
  {
    id: "u1",
    aty: "Айгүл",
    zhoni: "Нұрланова",
    login: "aigul.n",
    password: "mugalim2024",
    rol: "мұғалім",
    createdAt: "2024-09-01T00:00:00.000Z",
  },
  {
    id: "u2",
    aty: "Ерлан",
    zhoni: "Қасымов",
    login: "erlan.k",
    password: "okushy2024",
    rol: "оқушы",
    createdAt: "2024-09-01T00:00:00.000Z",
  },
  {
    id: "u3",
    aty: "Дана",
    zhoni: "Сейітова",
    login: "dana.s",
    password: "geo2024",
    rol: "оқушы",
    createdAt: "2024-09-01T00:00:00.000Z",
  },
];

function isBrowser() {
  return typeof window !== "undefined";
}

export function ensureSeedUsers(): User[] {
  if (!isBrowser()) return SEED_USERS;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_USERS));
    return SEED_USERS;
  }
  try {
    const parsed = JSON.parse(raw) as User[];
    const logins = new Set(parsed.map((u) => u.login));
    let changed = false;
    for (const seed of SEED_USERS) {
      if (!logins.has(seed.login)) {
        parsed.push(seed);
        changed = true;
      }
    }
    if (changed) localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    return parsed;
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_USERS));
    return SEED_USERS;
  }
}

export function getUsers(): User[] {
  return ensureSeedUsers();
}

export function registerUser(data: {
  aty: string;
  zhoni: string;
  login: string;
  password: string;
  rol: "оқушы" | "мұғалім";
}): { ok: true; user: User } | { ok: false; error: string } {
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
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  setSession(user);
  return { ok: true, user };
}

export function loginUser(
  login: string,
  password: string
): { ok: true; user: User } | { ok: false; error: string } {
  const users = getUsers();
  const user = users.find(
    (u) => u.login.toLowerCase() === login.toLowerCase() && u.password === password
  );
  if (!user) {
    return { ok: false, error: "Логин немесе құпия сөз қате." };
  }
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
    createdAt: user.createdAt,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(safe));
}

export function getSession(): SessionUser | null {
  if (!isBrowser()) return null;
  ensureSeedUsers();
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export function logout() {
  if (!isBrowser()) return;
  localStorage.removeItem(SESSION_KEY);
}
