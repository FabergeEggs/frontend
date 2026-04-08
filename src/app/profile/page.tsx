import styles from "./profilepage.module.css";
import ProfilePictureInput from "@/src/ui/inputs/ProfilePictureInput/ProfilePictureInput";
import ProfileForm from "@/src/ui/forms/ProfileForm/ProfileForm";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  // Think about authentication.
  // HTTP-only cookies are only on server. So, I need to make it a Server component?
  // Or create some hook to check auth.
  // For short: can I access access token from here without request to backend?

  // const cookieStore = await cookies();
  // const token = cookieStore.get("access_token");

  // if (!token) {
  //   redirect("/login");
  // }
  // console.log(cookieStore);

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
