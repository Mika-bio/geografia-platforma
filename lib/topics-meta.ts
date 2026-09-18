import data from "./data/topics-index.json";

export type TopicMeta = {
  id: string;
  grade: number;
  title: string;
  category: string;
};

type IndexFile = { grade8: TopicMeta[]; grade9: TopicMeta[] };

const file = data as IndexFile;

export const topicsMeta8 = file.grade8;
export const topicsMeta9 = file.grade9;
export const allTopicsMeta = [...topicsMeta8, ...topicsMeta9];

export function getTopicsMetaByGrade(grade: 8 | 9): TopicMeta[] {
  return grade === 8 ? topicsMeta8 : topicsMeta9;
}

export function getTopicMetaById(id: string): TopicMeta | undefined {
  return allTopicsMeta.find((t) => t.id === id);
}

/** Total topic count without loading full topics.json */
export const TOTAL_TOPICS = topicsMeta8.length + topicsMeta9.length;
