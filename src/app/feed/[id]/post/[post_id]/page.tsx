import styles from "./postpage.module.css";
import { getPost } from "@/src/lib/api/project";
import Image from "next/image";

import { TaskStatusEnum } from "@/src/lib/models/export/project";

import AuthorImage from "@/public/assets/project/author.svg";
import CreationTimeImage from "@/public/assets/project/creation-time.svg";
import CommentForm from "@/src/ui/forms/CommentForm/CommentForm";
import CommentCard from "@/src/ui/info/CommentCard/CommentCard";


// const data: Post = {
//     post_id: "1",
//     project_id: "1",
//     label: "Перепись населения в Ижевске",
//     creator: "Народный фольклор",
//     short_description: "",
//     description: `Надо срочно пересчитать жителей Ижевска. Посчитайте сколько народа живёт у вас в подъезде, укажите адрес для точности. Жителей Буммаша не считаем.\nБубубу лалал\nааааааааа`,
//     created_at: new Date(),
// }


const testCommentData = {
  username: "максЧерпак",
  id: "1",
  task_id: "1",
  user_id: "1",
  content: "Да, надо срочно пересчитать жителей Ижевска. Посчитайте сколько народа живёт у вас в подъезде, укажите адрес для точности. Жителей Буммаша не считаем.",
  created_at: "27.04.26 в 23:23",
  updated_at: "27.04.26 в 23:23",
}

const comments = [testCommentData, testCommentData, testCommentData]

export default async function Page({
  params,
}: {
  params: Promise<{ id: string, post_id: string }>;
}) {
  const { id, post_id } = await params;
  const data: Post = await getPost(id, post_id);

  // const comments: ... = await ...

  return (
    <div className={`pagecontainer ${styles.container}`}>
      <div className={styles.taskContainer}>
        <div className={`${styles.card} ${styles.cardPadding}`}>
          <h1 className={styles.label}>{data.label}</h1>
          <div className={styles.info}>
            <div className="basic-info-piece">
              <Image src={AuthorImage} alt="author image"></Image>
              <span className={styles.infoDescription}>Автор:</span>
              {data.creator}
            </div>
            <div className="basic-info-piece">
              <Image src={CreationTimeImage} alt="creation time image"></Image>
              <span className={styles.infoDescription}>Создано:</span>
              {new Date(data.created_at).toLocaleDateString("ru-RU")}
            </div>
          </div>
          <p className={styles.description}>{data.description}</p>
        </div>
      </div>
      <CommentForm className={styles.cardPadding} placeholder="Напишите свой комментарий"/>
      
      { comments.length > 0 && <div className={styles.responses}>
        {comments.map((value, index) => <CommentCard className={styles.cardPadding} {...value} key={index} />)}
      </div>}
      
    </div>
  );
}
