import styles from "./profilepage.module.css";
import LabelledProfileInput from "@/src/ui/inputs/LabelledProfileInputs/LabelledProfileInput";
import LabelledProfileTextarea from "@/src/ui/inputs/LabelledProfileInputs/LabelledProfileTextarea";
import ProfilePictureInput from "@/src/ui/inputs/ProfilePictureInput/ProfilePictureInput";

export default function Page() {
  return (
    <div className={`pagecontainer ${styles.container}`}>
      <div className={styles.profileInfo}>
        <h2 className={styles.title}>Профиль</h2>
        <LabelledProfileInput label="Имя" placeholder="Введите имя..." />
        <LabelledProfileInput
          type="email"
          label="Почта"
          placeholder="Введите почту..."
        />
        <LabelledProfileTextarea
          label="О себе"
          placeholder="Расскажите о себе..."
        />
        <LabelledProfileInput
          type="password"
          label="Пароль"
          placeholder="Введите пароль..."
        />
      </div>
      <div className={styles.pictureInputContainer}>
        <ProfilePictureInput />
      </div>
      <div className={styles.projectsContainer}>
        <h2 className={styles.title}>Проекты</h2>
        <div className={styles.myProjectsContainer}>
          <h3 className={styles.subtitle}>Мои проекты</h3>
        </div>
        <div className={styles.myProjectsContainer}>
          <h3 className={styles.subtitle}>Участие в проектах</h3>
        </div>
      </div>
    </div>
  );
}
