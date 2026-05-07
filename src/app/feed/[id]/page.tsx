import ProjectPageClient from "./client";
import { getProject } from "@/src/lib/api/project";

import { ProjectStatusEnum } from "@/src/lib/models/export/project";

const tag1: Tag = {
    tag_id: "1",
    name: "Сосиски",
    quantity_count: 1  // Кол-во проектов, помеченных данным тегом
}
const tag2: Tag = {
    tag_id: "2",
    name: "Пельмешки",
    quantity_count: 1  // Кол-во проектов, помеченных данным тегом
}

const tag3: Tag = {
    tag_id: "3",
    name: "Лезгинка",
    quantity_count: 1  // Кол-во проектов, помеченных данным тегом
}

const data: ProjectFull = {
    // info
    project_id: "1",
    label: "Мы представляем вам совершенно новую, обновлённую систему Линух",
    creator: "Российский Автопром",
    creator_id: "1",
    description: "Общественно-важный проект “вСрок” — это система, направленная на сокращение пищевых отходов путем создания удобного веб-сайта с информацией о продуктах с истекающим сроком годности, возможностью нахождения подходящего магазина поблизости к пользователю, где можно приобрести пищевые товары со значительной скидкой или получить их бесплатно. Веб-сайт не только информирует о месте, где можно купить продукты, но и позволяет оставить отметку, говорящую о том, что товар интересен пользователю и он желает сохранить информацию о нем в свой профиль. А также интернет-ресурс, разрабатываемый в процессе реализации проекта, дает возможность выбирать интересующий пользователя товар благодаря реализации системы рекомендаций, которая подбирает продукты для пользователя, основываясь на нескольких критериях, таких как местоположение магазина и пользователя, оценка магазина другими пользователями, срок годности товара.",
    tags: [tag1, tag2, tag3],
    created_at: new Date(), 
    status: ProjectStatusEnum.ACTIVE,

    // statistics
    tasks_count: 23,
    participants_count: 17,
    answers_count: 178
}



export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data: ProjectFull = await getProject(id);

  return (
      <ProjectPageClient data={data}/>
  );
}
