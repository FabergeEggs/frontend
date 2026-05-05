import ProjectCard from "../ProjectCard/ProjectCard";
import UserInfo from "../UserInfo/UserInfo";

export default function FeedCard() { 
    return (
        <ProjectCard>
            <UserInfo username="Пользователь 1" created_at="01.01.2024" />
        </ProjectCard>
    )
}