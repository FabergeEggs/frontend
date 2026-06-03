"use client";

import ProjectCard from "../ProjectCard/ProjectCard";
import UserInfo from "../UserInfo/UserInfo";
import styles from "./FeedCard.module.css";
import { useProjectStatistics } from "@/src/lib/query/project";

interface FeedCardProps {
  item: FeedItem;
}

const typeClass: Record<string, string> = {
  project: styles.project,
  task: styles.task,
  post: styles.post,
  response: styles.response,
};

export default function FeedCard({ item }: FeedCardProps) {
  const isProject = item.source_type === "project";
  const isResponse = item.source_type === "response";

  const isPost = item.source_type === "post";
  const isTask = item.source_type === "task";

  const projectId = isProject ? item.source_id : (item.project_id ?? "");

  // For response cards navigate directly to the task page
  const taskId = isResponse
    ? ((item.payload as Record<string, string> | null)?.task_id ?? "")
    : "";

  let cardTargetId: string;
  if (isResponse && taskId) {
    cardTargetId = `${projectId}/task/${taskId}`;
  } else if (isTask) {
    cardTargetId = `${projectId}/task/${item.source_id}`;
  } else if (isPost) {
    cardTargetId = `${projectId}/post/${item.source_id}`;
  } else {
    cardTargetId = projectId;
  }

  const statsQuery = useProjectStatistics(isProject ? item.source_id : "");

  const date = new Date(item.occurred_at).toLocaleDateString("ru-RU");

  const label = isResponse
    ? (item.label ?? "Ответ на задачу")
    : (item.label ?? "");

  return (
    <ProjectCard
      project_id={cardTargetId}
      label={label}
      short_description={item.short_description ?? ""}
      className={typeClass[item.source_type] ?? ""}
      showCounts={isProject}
      tasks_count={statsQuery.data?.tasks_count ?? 0}
      participants_count={statsQuery.data?.participants_count ?? 0}
    >
      {item.actor_name && (
        <UserInfo username={item.actor_name} created_at={date} avatar_url={item.actor_avatar_url} />
      )}
    </ProjectCard>
  );
}
