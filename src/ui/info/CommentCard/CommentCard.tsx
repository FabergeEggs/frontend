import styles from "./CommentCard.module.css";
import Image from "next/image";
import ProfilePicturePlug from "@/public/assets/project/profile_picture_plug.svg"
import ImageTextButton from "../../buttons/ImageTextButton/ImageTextButton";
import RedCrossImage from "@/public/assets/red-cross.svg";

interface CommentCardProps {
  className: string,
  id?: string | null;
  username: string
  user_id: string;
  content: string
  created_at?: string;
  canDelete?: boolean;
  onDelete?: () => void;
}

export default function CommentCard({
  className,
  username,
  content,
  created_at,
  canDelete = false,
  onDelete,
}: CommentCardProps) {
  return (
    <div className={`${className} basic-card`}>
      <div className={styles.header}>
        <div className={styles.user}>
          <Image src={ProfilePicturePlug} alt="Profile picture"/>
          <div className={styles.username}>
            {username}
            <div className={styles.date}>
              {created_at ?? "Дата неизвестна"}
            </div>
          </div>
        </div>
        {canDelete && (
          <ImageTextButton
            text="Удалить"
            src={RedCrossImage}
            color="var(--danger-color)"
            onClick={onDelete}
          />
        )}
      </div>
      <div className={styles.content}>
        {content}
      </div>
    </div>
  );
}
