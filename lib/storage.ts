export type StudentProfile = {
  name: string;
  grade: 8 | 9;
};

export type ResultEntry = {
  id: string;
  userId?: string;
  name: string;
  grade: 8 | 9;
  type: "test" | "olympiad" | "pisa" | "topic" | "map";
  title: string;
  correct: number;
  total: number;
  percent: number;
  score: number;
  xp: number;
  weakTopics?: string[];
  wrong?: { question: string; your?: string; correct: string; explanation: string }[];
  at: string;
  meta?: Record<string, unknown>;
};

export type RewardsState = {
  xp: number;
  stars: number;
  level: number;
  badges: string[];
};

export type TeacherClass = {
  id: string;
  name: string;
  grade: 8 | 9;
  studentIds: string[];
};

export type Assignment = {
  id: string;
  classId: string;
  type: "test" | "olympiad" | "pisa";
  title: string;
  createdAt: string;
};

const KEYS = {
  profile: "geopro_profile",
  results: "geopro_results",
  rewards: "geopro_rewards",
  classes: "geopro_classes",
  assignments: "geopro_assignments",
  completedTopics: "geopro_completed_topics",
};

function browser() {
  return typeof window !== "undefined";
}

export function getProfile(): StudentProfile | null {
  if (!browser()) return null;
  try {
    const raw = localStorage.getItem(KEYS.profile);
    return raw ? (JSON.parse(raw) as StudentProfile) : null;
  } catch {
    return null;
  }
}

export function setProfile(p: StudentProfile) {
  if (!browser()) return;
  localStorage.setItem(KEYS.profile, JSON.stringify(p));
}

export function getResults(): ResultEntry[] {
  if (!browser()) return [];
  try {
    const raw = localStorage.getItem(KEYS.results);
    return raw ? (JSON.parse(raw) as ResultEntry[]) : [];
  } catch {
    return [];
  }
}

export function addResult(entry: Omit<ResultEntry, "id" | "at"> & { id?: string; at?: string }) {
  if (!browser()) return;
  const list = getResults();
  const full: ResultEntry = {
    ...entry,
    id: entry.id || `r${Date.now()}`,
    at: entry.at || new Date().toISOString(),
  };
  list.unshift(full);
  localStorage.setItem(KEYS.results, JSON.stringify(list.slice(0, 500)));
  addRewardsFromResult(full);
  return full;
}

export function getRewards(): RewardsState {
  if (!browser()) return { xp: 0, stars: 0, level: 1, badges: [] };
  try {
    const raw = localStorage.getItem(KEYS.rewards);
    if (!raw) return { xp: 0, stars: 0, level: 1, badges: [] };
    return JSON.parse(raw) as RewardsState;
  } catch {
    return { xp: 0, stars: 0, level: 1, badges: [] };
  }
}

export const REWARDS_EVENT = "geopro-rewards-updated";

export function setRewards(r: RewardsState) {
  if (!browser()) return;
  localStorage.setItem(KEYS.rewards, JSON.stringify(r));
  try {
    window.dispatchEvent(new CustomEvent(REWARDS_EVENT));
  } catch {
    /* ignore */
  }
}

export type BadgeDef = {
  id: string;
  name: string;
  desc: string;
  check: (r: RewardsState, res: ResultEntry[]) => boolean;
};

export const BADGE_DEFS: BadgeDef[] = [
  { id: "explorer", name: "Географ-зерттеуші", desc: "50+ XP жинаңыз", check: (r) => r.xp >= 50 },
  { id: "mapper", name: "Карта шебері", desc: "Карта викторинасын аяқтаңыз", check: (_r, res) => res.some((x) => x.type === "map") },
  { id: "olympiad", name: "Олимпиада көшбасшысы", desc: "Олимпиададан ≥70%", check: (_r, res) => res.some((x) => x.type === "olympiad" && x.percent >= 70) },
  { id: "analyst", name: "Аналитик", desc: "PISA сценарийін аяқтаңыз", check: (_r, res) => res.some((x) => x.type === "pisa") },
  { id: "eco", name: "Экология сарапшысы", desc: "Экология/су тақырыбы бойынша нәтиже", check: (_r, res) => res.some((x) => /су|эколог|PISA|тапшы/i.test(x.title) || x.type === "pisa") },
];

function levelFromXp(xp: number) {
  return Math.max(1, Math.floor(xp / 100) + 1);
}

function addRewardsFromResult(entry: ResultEntry) {
  const r = getRewards();
  r.xp += entry.xp;
  r.stars += Math.max(0, Math.floor(entry.percent / 25));
  r.level = levelFromXp(r.xp);
  const all = getResults();
  for (const b of BADGE_DEFS) {
    if (!r.badges.includes(b.id) && b.check(r, all)) r.badges.push(b.id);
  }
  setRewards(r);
}

export function getCompletedTopics(): string[] {
  if (!browser()) return [];
  try {
    const raw = localStorage.getItem(KEYS.completedTopics);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function markTopicCompleted(id: string) {
  if (!browser()) return;
  const list = new Set(getCompletedTopics());
  list.add(id);
  localStorage.setItem(KEYS.completedTopics, JSON.stringify(Array.from(list)));
}

export function getClasses(): TeacherClass[] {
  if (!browser()) return [];
  try {
    const raw = localStorage.getItem(KEYS.classes);
    return raw ? (JSON.parse(raw) as TeacherClass[]) : [];
  } catch {
    return [];
  }
}

export function saveClasses(c: TeacherClass[]) {
  if (!browser()) return;
  localStorage.setItem(KEYS.classes, JSON.stringify(c));
}

export function getAssignments(): Assignment[] {
  if (!browser()) return [];
  try {
    const raw = localStorage.getItem(KEYS.assignments);
    return raw ? (JSON.parse(raw) as Assignment[]) : [];
  } catch {
    return [];
  }
}

export function saveAssignments(a: Assignment[]) {
  if (!browser()) return;
  localStorage.setItem(KEYS.assignments, JSON.stringify(a));
}

export function exportResultsCsv(rows: ResultEntry[]): string {
  const header = "Аты,Сынып,Түрі,Тақырып,Дұрыс,Барлығы,Пайыз,Ұпай,XP,Күні";
  const lines = rows.map((r) =>
    [r.name, r.grade, r.type, `"${r.title.replace(/"/g, '""')}"`, r.correct, r.total, r.percent, r.score, r.xp, r.at].join(",")
  );
  return [header, ...lines].join("\n");
}
