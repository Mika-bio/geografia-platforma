import data from "./data/olympiad.json";

export type OlympiadItem = {
  id: string;
  level: 1 | 2 | 3;
  levelLabel: string;
  type: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  chart?: { months: string[]; temp: number[]; precip: number[] };
  table?: { headers: string[]; rows: string[][] };
};

export const olympiadItems = data as OlympiadItem[];

export function getOlympiadByLevel(level: 1 | 2 | 3) {
  return olympiadItems.filter((o) => o.level === level);
}

export const levelMeta = [
  { level: 1 as const, title: "І базалық", desc: "Карта, масштаб, координаталар, негізгі логика" },
  { level: 2 as const, title: "ІІ күрделі", desc: "Салыстыру, кесте, климат, себеп-салдар" },
  { level: 3 as const, title: "ІІІ олимпиадалық", desc: "Көп дұрыс, терең талдау, кешенді есептер" },
];
