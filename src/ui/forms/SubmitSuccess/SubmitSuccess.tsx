import styles from './SubmitSuccess.module.css'

interface SubmitSuccessProps {
  messages: string[]   // список успехов
}

export default function SubmitSuccess({ messages }: SubmitSuccessProps) {
  if (messages.length === 0) return null

  return (
    <div className={styles.error}>
      {messages.map((message: string, i: number) => (
        <div key={i} className={styles.row}>
          <p className={styles.message}>{message}</p>
        </div>
      ))}
    </div>
  )
}