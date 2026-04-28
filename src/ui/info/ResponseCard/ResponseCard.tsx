import styles from "./TaskCard.module.css";
import Image from "next/image";



interface TaskCardProps {
  label: string,
  short_description: string, // I suppose description should be shorted if needed and then ... needs to be added
  answers_count: number
}

// Alternative Project Card variant for project page
export default function ResponseCard({label, short_description, answers_count}: TaskCardProps) {
  return (
    <div className={styles.card}>
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
