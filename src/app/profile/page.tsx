import styles from "./profilepage.module.css";
import ProfilePictureInput from "@/src/ui/inputs/ProfilePictureInput/ProfilePictureInput";
import ProfileForm from "@/src/ui/forms/ProfileForm/ProfileForm";

export default async function Page() {
  return (
    <div className={`pagecontainer ${styles.container}`}>
      <div>
        <h2 className={styles.title}>Профиль</h2>
        <ProfileForm />
      </div>
      <div className={styles.pictureInputContainer}>
        <ProfilePictureInput />
      </div>
      <div className={styles.projectsContainer}>
        <div className={styles.myProjectsContainer}>
          <h2 className={styles.title}>Мои проекты</h2>
        </div>
        <div className={styles.myProjectsContainer}>
          <h2 className={styles.title}>Участие в проектах</h2>
        </div>
      </div>
    </div>
  );
}
