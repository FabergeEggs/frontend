import ProjectCard from "../ProjectCard/ProjectCard";
import UserInfo from "../UserInfo/UserInfo";

export default function FeedCard() {
  return (
    <ProjectCard
      project_id="00000000-0000-0000-0000-000000000000"
      label="Пример проекта"
      short_description="Краткое описание"
    >
      <UserInfo username="Пользователь 1" created_at="01.01.2024" />
    </ProjectCard>
  );
}
