import { notFound } from "next/navigation";
import { allTopics, getTopicById } from "@/lib/topics";
import TopicClient from "./TopicClient";

export function generateStaticParams() {
  return allTopics.map((t) => ({ id: t.id }));
}

export default function TopicPage({ params }: { params: { id: string } }) {
  const topic = getTopicById(params.id);
  if (!topic) notFound();
  return <TopicClient topic={topic} />;
}
