import styles from "./ResponseCard.module.css";
import Image from "next/image";
import ProfilePicturePlug from "@/public/assets/project/profile_picture_plug.svg"



interface ResponseCardProps {
  label: string
  user_id: string;
  text: string
  status: ResponseStatus
  short_description: string // I suppose description should be shorted if needed and then ... needs to be added
  attached_files: string[]
  created_at: string;
}

// Alternative Project Card variant for project page
export default function ResponseCard({label, short_description, answers_count}: ResponseCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>
        <Image src={ProfilePicturePlug} alt="Profile picture"></Image>{label}
      </div>
      <div className={styles.description}>
        {short_description}
      </div>
      <div className={styles.attachedFiles}>
        
      </div>
    </div>
  );
}
