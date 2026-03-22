import styles from './Tag.module.css'

export default function Tag({ text }: {text: string}) {
  return (
    <div className={`basic-box ${styles.tag}`}>
        {text}
    </div>
  )
}