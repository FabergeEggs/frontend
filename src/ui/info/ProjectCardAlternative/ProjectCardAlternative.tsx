import styles from "./ProjectCardAlternative.module.css";
import Image from "next/image";

import Task from "@/public/assets/project/task_black.svg"
import Post from "@/public/assets/project/post.svg"
import Comment from "@/public/assets/project/comment.svg"

interface ProjectCardAlternativeProps {
  children?: React.ReactNode
  label: string,
  short_description: string, // I suppose description should be shorted if needed and then ... needs to be added
  answers_count: number
}

// Alternative Project Card variant for project page
export default function ProjectCardAlternative({children, label, short_description, answers_count}: ProjectCardAlternativeProps) {
  return (
    <div className={styles.card}>
      {/* {children?} Сюда будет помещён никнейм и аватарка для ProjectCard */}
      <div className={styles.label}>
        <Image src={Task} alt="Task image"></Image>{label}
      </div>
      <div className={styles.description}>
        {short_description}
      </div>
      <div className={styles.answers}>
        <Image src={Comment} alt="Comment image"></Image>{answers_count} ответов
      </div>
    </div>
  );
}
