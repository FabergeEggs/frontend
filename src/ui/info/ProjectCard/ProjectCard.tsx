import styles from "./ProjectCard.module.css";
import Tag from "../Tag/Tag";
import Image from "next/image";

import VerticalLine from "@/public/assets/project/vertical-line.svg";
import UserImage from "@/public/assets/project/user.svg";
import TaskImage from "@/public/assets/project/task.svg";

import { useRouter } from "next/router";

interface ProjectCardProps {
  children?: React.ReactNode
  project_id: string,
  label: string,
  short_description: string, // I suppose description should be shorted if needed and then ... needs to be added
  tags?: string[],
  tasks_count?: number,
  participants_count?: number
}

// <!>
// interface MembershipProjectDTO {
//     project_id: string
//     label: string
//     short_description: string
//     created_at: Date 
//      NEED tags
//      NEED tasks_count
//      NEED participants_count
//     status: TaskStatusEnum 
//     creator_name: string
// }

export default function ProjectCard({children, project_id, label, short_description, tags = ["Урбанистика", "Кириешки"], tasks_count = 5, participants_count = 17}: ProjectCardProps) {
  const router = useRouter();
  
  return (
    <div onClick={() => router.push(`/feed/${project_id}`)} className={`basic-card-unbordered ${styles.card}`}>
      {children}
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
