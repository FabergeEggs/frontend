import styles from './ProjectFormTag.module.css'
import Image from 'next/image'
import CancelTagImage from "@/public/assets/project/cancel-tag.svg"

export default function ProjectFormTag({ children, onClick }: {children: string, onClick?: () => void}) {
  return (
    <div className={styles.tag}>
        {children}
        <Image onClick={onClick} className={styles.img} src={CancelTagImage} alt="cancel tag"></Image>
    </div>
  )
}