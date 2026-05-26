import ProjectCard from "../ProjectCard/ProjectCard";
import UserInfo from "../UserInfo/UserInfo";

interface FeedCardProps {
  item: FeedItem;
}

export default function FeedCard({ item }: FeedCardProps) {
  // For project events source_id IS the project; for post/task project_id is the parent
  const projectId =
    item.source_type === "project"
      ? item.source_id
      : (item.project_id ?? "");

  const date = new Date(item.occurred_at).toLocaleDateString("ru-RU");

  return (
    <ProjectCard
      project_id={projectId}
      label={item.label ?? ""}
      short_description={item.short_description ?? ""}
    >
      {item.actor_name && (
        <UserInfo username={item.actor_name} created_at={date} />
      )}
    </ProjectCard>
  );
}
