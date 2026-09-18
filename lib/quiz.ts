import data from "./quiz-data.json";

export type QuizQuestion = {
  id: string;
  category: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const quizQuestions = data as QuizQuestion[];

export const categoryLabels: Record<string, string> = {
  zertteu: "Зерттеу әдістері",
  kartografia: "Картография",
  litosfera: "Литосфера",
  atmosfera: "Атмосфера",
  gidrosfera: "Гидросфера",
  terminder: "Терминдер",
  all: "Барлығы",
};

export function getQuestionsByCategory(cat: string): QuizQuestion[] {
  if (cat === "all") return quizQuestions;
  return quizQuestions.filter((q) => q.category === cat);
}
