import styles from './ValidationError.module.css'
import DangerImage from '@/public/assets/danger.svg'
import CloseImage from '@/public/assets/close.svg'
import Image from 'next/image';

interface ValidationErrorProps {
  messages: string[]   // список ошибок
}

export default function ValidationError({ messages }: ValidationErrorProps) {
  if (messages.length === 0) return null

  return (
    <div className={styles.error}>
      {messages.map((message: string, i: number) => (
        <div key={i} className={styles.row}>
          <Image src={DangerImage} alt="Error" width={16} height={14} />
          <p className={styles.message}>{message}</p>
        </div>
      ))}
    </div>
  )
}