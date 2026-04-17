import styles from './Tag.module.css'

export default function Tag({ children }: {children: string}) {
  return (
    <div className={`basic-box ${styles.tag}`}>
        {children}
    </div>
  )
}