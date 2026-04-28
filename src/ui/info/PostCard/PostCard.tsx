import styles from "./PostCard.module.css";
import Image from "next/image";

import Post from "@/public/assets/project/post.svg"
import Comment from "@/public/assets/project/comment.svg"

interface PostCardProps {
  label: string,
  short_description: string, // I suppose description should be shorted if needed and then ... needs to be added
  comments_count: number
}

// Alternative Project Card variant for project page
export default function PostCard({label, short_description, comments_count}: PostCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>
        <Image src={Post} alt="Task image"></Image>{label}
      </div>
      <div className={styles.description}>
        {short_description}
      </div>
      <div className={styles.answers}>
        <Image src={Comment} alt="Comment image"></Image>{comments_count} комментариев
      </div>
    </div>
  );
}
