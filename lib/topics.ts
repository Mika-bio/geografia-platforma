/** Full topic payloads (~370KB). Prefer @/lib/topics-meta for listings. */
import data from "./data/topics.json";

export type QA = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  type?: string;
  grade?: number;
  topicId?: string;
};

export type Topic = {
  id: string;
  grade: number;
  title: string;
  category: string;
  theory: string[];
  practice: QA[];
  mapTask: QA;
  tests: QA[];
};

type TopicsFile = { grade8: Topic[]; grade9: Topic[] };

const file = data as TopicsFile;

export const topicsGrade8 = file.grade8;
export const topicsGrade9 = file.grade9;
export const allTopics = [...topicsGrade8, ...topicsGrade9];

export function getTopicsByGrade(grade: 8 | 9): Topic[] {
  return grade === 8 ? topicsGrade8 : topicsGrade9;
}

export function getTopicById(id: string): Topic | undefined {
  return allTopics.find((t) => t.id === id);
}
