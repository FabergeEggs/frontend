import styles from "./projectpage.module.css";
// import { getTask } from "@/src/lib/api/project";
import Image from "next/image";

// import { TaskStatusEnum } from "@/src/lib/models/export/project";

import AuthorImage from "@/public/assets/project/author.svg";
import CreationTimeImage from "@/public/assets/project/creation-time.svg";
import StatusActiveImage from "@/public/assets/project/status-active.svg";
import ResponseCard from "@/src/ui/info/ResponseCard/ResponseCard";


const data: Task = {
    task_id: "1",
    project_id: "1",
    label: "Перепись населения в Ижевске",
    creator: "Народный фольклор",
    short_description: "",
    description: `Надо срочно пересчитать жителей Ижевска. Посчитайте сколько народа живёт у вас в подъезде, укажите адрес для точности. Жителей Буммаша не считаем.\nБубубу лалал\nааааааааа`,
    created_at: new Date(),
    status: TaskStatusEnum.ACTIVE,
    answers_count: 3
}

const testResponseData: ResponseDTO = {
  id: "1",
  task_id: "1",
  user_id: "1",
  text: "Да, надо срочно пересчитать жителей Ижевска. Посчитайте сколько народа живёт у вас в подъезде, укажите адрес для точности. Жителей Буммаша не считаем.",
  status: ResponseStatus.ACCEPTED,
  attached_files: ["goida.txt", "goida.txt", "goida.txt"],
  created_at: "27.04.26 в 23:23",
  updated_at: "27.04.26 в 23:23",
}

const responses = [testResponseData, testResponseData, testResponseData]

export default async function Page({
  params,
}: {
  params: Promise<{ id: string, task_id: string }>;
}) {
  const { id, task_id } = await params;
  // const data: ProjectFull = await getProject(id, task_id);

  // const tasks: ... = await ...
  // const posts: ... = await ...

  return (
    <div className={`pagecontainer ${styles.container}`}>
      <div className={styles.taskContainer}>
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
              {data.status == TaskStatusEnum.ACTIVE && "Активен"}
              {data.status == TaskStatusEnum.FINISHED && "Завершён"}
              {data.status == TaskStatusEnum.DELETED && "Удалён"}
            </div>
          </div>
          <p className={styles.description}>{data.description}</p>
        </div>
      </div>
      
      { responses.length > 0 && <div className={styles.responses}>
        {responses.map((value, index) => <ResponseCard {...value} key={index} />)}
      </div>}
      
        
    </div>
  );
}
