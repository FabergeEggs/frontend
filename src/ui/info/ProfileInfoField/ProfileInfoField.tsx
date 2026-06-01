import styles from './ProfileInfoField.module.css'

export default function ProfileInfoField({ label, value }: { label: string, value: string}) {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        {label}{" "}
      </div>
      <div className={`basic-input-container ${styles.inputContainer}`}>
        {value}
      </div>
    </div>
    )
}