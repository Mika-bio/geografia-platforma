import data from "./data/pisa.json";

export type PisaQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  feedback: string;
};

export type PisaScenario = {
  id: string;
  title: string;
  situation: string;
  text: string;
  visual: {
    kind: string;
    title: string;
    bars?: { label: string; value: number }[];
    points?: { label: string; value: number }[];
    headers?: string[];
    rows?: string[][];
    note?: string;
  };
  questions: PisaQuestion[];
};

export const pisaScenarios = data as PisaScenario[];
