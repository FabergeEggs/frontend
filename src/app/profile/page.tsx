import { email } from "zod";
import ProfileClient from "./client";
import { getProfile } from "@/src/lib/api/profile";
import { ProjectStatusEnum } from "@/src/lib/models/export/project";

export default async function Page() {
  // Fetch прямо на сервере — куки передаются автоматически
  // const userData = await getProfile("08bbe2d4-824d-4eac-8984-001ff1954429"); // если настроить серверный fetch
  
  
  const userData = {
    sub: "abc",
    email: "lexander@gmail.com",
    given_name: "Алексей", // Имя
    about: "",   // О себе
    realm_roles: ["Priv", "Password", "asd"],
    client_roles: {
      "frontend": ["view_profile", "edit_profile"],
      "api": ["read", "write"]
    },
    raw_claims: {
      "email": "alexey@example.com",
      "email_verified": true,
      "name": "Алексей",
      "preferred_username": "alexey"
    }
  }

  const testProjectData = {
    id: "kek",
    label: "Перепись населения в городе Ижевск",
    creator: "Somewho",
    short_description:
      "В связи с приходом весны жители Буммаша начали активно почковаться, внося диссонанс в статистику населения столицы России. С целью обновления статистических данных нам необходимо собрать информацию о текущем населении Ижевска. Вы можете помочь нам, ведь вам понадобиться лишь простой советский...",
    description: "kek",
    tags: ["Урбанистика", "Кириешки"],
    created_at: new Date(2026, 3, 16), // April 16, 2026 (months are 0-based)
    updated_at: new Date(),
    status: ProjectStatusEnum.ACTIVE,

    tasks_count: 16,
    participants_count: 17,
    answers_count: 128,
  };

  const myProjects = [testProjectData];
  const projectParticipations = [testProjectData, testProjectData];

  return (
    <ProfileClient
      userData={userData}
      myProjects={myProjects}
      projectParticipations={projectParticipations}
    />
  );
}
