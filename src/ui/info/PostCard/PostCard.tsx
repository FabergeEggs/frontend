import styles from "./PostCard.module.css";
import Image from "next/image";

import Post from "@/public/assets/project/post.svg"
import Comment from "@/public/assets/project/comment.svg"

interface PostCardProps {
  children?: React.ReactNode,
  label: string,
  short_description: string, // I suppose description should be shorted if needed and then ... needs to be added
  comments_count: number
}

// Alternative Project Card variant for project page
export default function PostCard({children, label, short_description, comments_count}: PostCardProps) {
  return (
    <div className={`basic-card-unbordered ${styles.card}`}>
      <div className={styles.header}>
        <div className={styles.label}>
          <Image src={Post} alt="Post image"/>{label}
        </div>
        {children}
      </div>
      <div className={styles.description}>
        {short_description}
      </div>
      <div className={styles.answers}>
        <Image src={Comment} alt="Comment image"/>{comments_count} комментариев
      </div>
    </div>
  );
}
