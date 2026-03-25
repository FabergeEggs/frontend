import styles from "./ProfilePictureInput.module.css";

export default function ProfilePictureInput() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Аватар профиля</p>
      <div className={styles.imageContainer}></div>
      <div className={styles.buttons}>
        <button className={`basic-btn ${styles.btn}`}>Загрузить</button>
        <button className={`basic-btn ${styles.btn}`}>Удалить</button>
      </div>
    </div>
  );
}
