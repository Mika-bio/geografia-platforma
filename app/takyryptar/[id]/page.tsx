import { notFound } from "next/navigation";
import { getTopicById } from "@/lib/topics";
import { allTopicsMeta } from "@/lib/topics-meta";
import TopicClient from "./TopicClient";

export function generateStaticParams() {
  return allTopicsMeta.map((t) => ({ id: t.id }));
}

export default function TopicPage({ params }: { params: { id: string } }) {
  const topic = getTopicById(params.id);
  if (!topic) notFound();
  return <TopicClient topic={topic} />;
}
