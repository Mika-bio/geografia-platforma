import tests8 from "./data/tests8.json";
import tests9 from "./data/tests9.json";

export type TestQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  grade: number;
  category: string;
  difficulty: string;
};

export const grade8Tests = tests8 as TestQuestion[];
export const grade9Tests = tests9 as TestQuestion[];

export function getTests(grade: 8 | 9): TestQuestion[] {
  return grade === 8 ? grade8Tests : grade9Tests;
}
