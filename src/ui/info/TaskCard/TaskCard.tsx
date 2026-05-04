import styles from "./TaskCard.module.css";
import Image from "next/image";

import Task from "@/public/assets/project/task_black.svg"
import Comment from "@/public/assets/project/comment.svg"

import { useRouter } from "next/router";

interface TaskCardProps {
  children?: React.ReactNode,
  project_id: string,
  id: string,
  label: string,
  short_description: string, // I suppose description should be shorted if needed and then ... needs to be added
  answers_count: number
}

// Alternative Project Card variant for project page
export default function TaskCard({children, project_id, id, label, short_description, answers_count}: TaskCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/projects/${project_id}/tasks/${id}`);
  };

  return (
    <div className={`basic-card-unbordered ${styles.card}`} onClick={handleCardClick}>
      <div className={styles.header}>
        <div className={styles.label}>
          <Image src={Task} alt="Task image"/>{label}
        </div>
        {children}
      </div>
      <div className={styles.description}>
        {short_description}
      </div>
      <div className={styles.responses}>
        <Image src={Comment} alt="Response image"/>{answers_count} ответов
      </div>
    </div>
  );
}
