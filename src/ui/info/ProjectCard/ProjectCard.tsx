import styles from "./ProjectCard.module.css";
import Tag from "../Tag/Tag";
import Image from "next/image";

import VerticalLine from "@/public/assets/project/vertical-line.svg";
import UserImage from "@/public/assets/project/user.svg";
import TaskImage from "@/public/assets/project/task.svg";

interface ProjectCardProps {
  children?: React.ReactNode
  label: string,
  short_description: string, // I suppose description should be shorted if needed and then ... needs to be added
  tags: string[],
  tasks_count: number,
  participants_count: number
}

export default function ProjectCard({children, label, short_description, tags, tasks_count, participants_count}: ProjectCardProps) {
  return (
    <div className={styles.card}>
      {/* {children?} Сюда будет помещён никнейм и аватарка для LabelledProjectCard */}
      <div className={styles.label}>{label}</div>
      <div className={styles.info}>
        <div className={styles.tags}>
        {tags.map((tag, index) => (
          <Tag key={index}>
            {tag}
          </Tag>
        ))}
        </div>
        <div className={styles.countInfo}>
          <Image className={styles.temporaryVerticalLine} src={VerticalLine} alt="Vertical Line" />
          <Image src={UserImage} alt="User Image" />
          {participants_count} участников
          <Image src={VerticalLine} alt="Vertical Line" />
          <Image src={TaskImage} alt="Task Image" />
          {tasks_count} задач
        </div>
      </div>
      <div className={styles.description}>
        {short_description}
      </div>
    </div>
  );
}
