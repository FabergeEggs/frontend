import styles from "./projectpage.module.css";
import { getProject } from "@/src/lib/api/project";
import Image from "next/image";
import Tag from "@/src/ui/info/Tag/Tag";

import { ProjectStatusEnum } from "@/src/lib/models/export/project";

import AuthorImage from "@/public/assets/project/author.svg";
import CreationTimeImage from "@/public/assets/project/creation-time.svg";
import StatusActiveImage from "@/public/assets/project/status-active.svg";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data: ProjectFull = await getProject(id);

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
    </div>
  );
}
