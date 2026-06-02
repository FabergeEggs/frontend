import styles from "./CommentCard.module.css";
import Image from "next/image";
const DEFAULT_AVATAR = "/assets/project/example.png";

interface CommentCardProps {
  className: string,
  username: string
  user_id: string;
  content: string
  created_at?: string;
}

export default function CommentCard({className, username, user_id, content, created_at}: CommentCardProps) {
  return (
    <div className={`${className} basic-card`}>
      <div className={styles.user}>
        <Image src={DEFAULT_AVATAR} alt="Profile picture" width={40} height={40} />
        <div className={styles.username}>
          {username}
          <div className={styles.date}>
            {created_at ?? "Дата неизвестна"}
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {content}
      </div>
    </div>
  );
}
