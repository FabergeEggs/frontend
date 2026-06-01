import Link from "next/link";
import Image from "next/image";

import ArrowLeftImage from "@/public/assets/arrow-right.svg";

import styles from "./BackToProjectLink.module.css";

export default function BackToProjectLink({ projectId }: { projectId: string }) {
  return (
    <Link className={styles.link} href={`/feed/${projectId}`}>
      <Image src={ArrowLeftImage} alt="" width={20} height={20} />
      <span className={styles.text}>К проекту</span>
    </Link>
  );
}
