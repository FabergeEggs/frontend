import styles from "./CommentCard.module.css";
import UserInfo from "../UserInfo/UserInfo";

interface CommentCardProps {
  className: string;
  username: string;
  user_id: string;
  avatar_url?: string | null;
  content: string;
  created_at?: string;
}

export default function CommentCard({className, username, user_id: _user_id, avatar_url, content, created_at}: CommentCardProps) {
  return (
    <div className={`${className} basic-card`}>
      <UserInfo username={username} created_at={created_at ?? ""} avatar_url={avatar_url} />
      <div className={styles.content}>
        {content}
      </div>
    </div>
  );
}
