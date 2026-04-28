import styles from "./projectpage.module.css";
import { getProject } from "@/src/lib/api/project";
import Image from "next/image";
import Tag from "@/src/ui/info/Tag/Tag";

import { ProjectStatusEnum } from "@/src/lib/models/export/project";

import AuthorImage from "@/public/assets/project/author.svg";
import CreationTimeImage from "@/public/assets/project/creation-time.svg";
import StatusActiveImage from "@/public/assets/project/status-active.svg";
import ProjectCardAlternative from "@/src/ui/info/ProjectCardAlternative/ProjectCardAlternative";

const tag1: Tag = {
    tag_id: "1",
    name: "Сосиски",
    quantity_count: 1  // Кол-во проектов, помеченных данным тегом
}
const tag2: Tag = {
    tag_id: "1",
    name: "Пельмешки",
    quantity_count: 1  // Кол-во проектов, помеченных данным тегом
}

const tag3: Tag = {
    tag_id: "1",
    name: "Лезгинка",
    quantity_count: 1  // Кол-во проектов, помеченных данным тегом
}

const data: ProjectFull = {
    // info
    id: "1",
    label: "Мы представляем вам совершенно новую, обновлённую систему Линух",
    creator: "Российский Автопром",
    short_description: "Мы Делаем Деньги!",
    description: "Общественно-важный проект “вСрок” — это система, направленная на сокращение пищевых отходов путем создания удобного веб-сайта с информацией о продуктах с истекающим сроком годности, возможностью нахождения подходящего магазина поблизости к пользователю, где можно приобрести пищевые товары со значительной скидкой или получить их бесплатно. Веб-сайт не только информирует о месте, где можно купить продукты, но и позволяет оставить отметку, говорящую о том, что товар интересен пользователю и он желает сохранить информацию о нем в свой профиль. А также интернет-ресурс, разрабатываемый в процессе реализации проекта, дает возможность выбирать интересующий пользователя товар благодаря реализации системы рекомендаций, которая подбирает продукты для пользователя, основываясь на нескольких критериях, таких как местоположение магазина и пользователя, оценка магазина другими пользователями, срок годности товара.",
    tags: [tag1, tag2, tag3],
    created_at: new Date(), 
    updated_at: new Date(),
    status: ProjectStatusEnum.ACTIVE,

    // statistics
    tasks_count: 23,
    participants_count: 17,
    answers_count: 178
}

const testProjectData = {
  label: "Перепись населения в городе Ижевск",
  short_description: "В связи с приходом весны жители Буммаша начали активно почковаться, внося диссонанс в статистику населения столицы России. С целью обновления статистических данных нам необходимо собрать информацию о текущем населении Ижевска. Вы можете помочь нам, ведь вам понадобиться лишь простой советский...", 
  answers_count: 11
}

const projects = [testProjectData, testProjectData]

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data: ProjectFull = await getProject(id);

  // const projects: ... = await ...

  return (
    <div className={`pagecontainer ${styles.container}`}>
      <div className={styles.projectContainer}>
        <div className={styles.card}>
          <h1 className={styles.label}>{data.label}</h1>
          <div className={styles.info}>
            <div className={styles.infoPiece}>
              <Image src={AuthorImage} alt="author image"></Image>
              <span className={styles.infoDescription}>Автор:</span>
              {data.creator}
            </div>
            <div className={styles.infoPiece}>
              <Image src={CreationTimeImage} alt="creation time image"></Image>
              <span className={styles.infoDescription}>Создано:</span>
              {new Date(data.created_at).toLocaleDateString("ru-RU")}
            </div>
            <div className={styles.infoPiece}>
              <Image src={StatusActiveImage} alt="active status image"></Image>
              <span className={styles.infoDescription}>Статус:</span>
              {data.status == ProjectStatusEnum.ACTIVE && "Активен"}
              {data.status == ProjectStatusEnum.FINISHED && "Завершён"}
              {data.status == ProjectStatusEnum.DELETED && "Удалён"}
            </div>
          </div>
          <div className={styles.tags}>
            {data.tags &&
              data.tags.map((tag: Tag, index: number) => (
                <Tag key={tag.tag_id || index}>{tag.name}</Tag>
              ))}
          </div>
          <p className={styles.description}>{data.description}</p>
        </div>
        <div className={styles.countInfo}>
          <div className={styles.box}>
            <span className={styles.count}>{data.participants_count}</span>
            <span>участников</span>
          </div>
          <div className={styles.box}>
            <span className={styles.count}>{data.tasks_count}</span>
            <span>заданий</span>
          </div>
          <div className={styles.box}>
            <span className={styles.count}>{data.answers_count}</span>
            <span>ответов</span>
          </div>
        </div>
      </div>
        { projects.length > 0 && <div className={styles.projects}>
          {projects.map((value, index) => <ProjectCardAlternative {...value} key={index} />)}
          
        </div>}
    </div>
  );
}
