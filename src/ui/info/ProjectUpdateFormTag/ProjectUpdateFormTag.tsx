import styles from './ProjectUpdateFormTag.module.css'
import Image from 'next/image'
import CancelTagImage from "@/public/assets/close.svg"

export default function ProjectUpdateFormTag({ children, onClick }: {children: string, onClick?: () => void}) {
  return (
    <div className={styles.tag}>
        {children}
        <Image onClick={onClick} className={styles.img} src={CancelTagImage} alt="cancel tag"></Image>
    </div>
  )
}