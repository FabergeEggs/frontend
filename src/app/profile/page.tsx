"use client"

import styles from "./profilepage.module.css";
import LabelledProfileInput from "@/src/ui/inputs/LabelledProfileInputs/LabelledProfileInput";
import LabelledProfileTextarea from "@/src/ui/inputs/LabelledProfileInputs/LabelledProfileTextarea";
import ProfilePictureInput from "@/src/ui/inputs/ProfilePictureInput/ProfilePictureInput";
import { me } from "@/src/lib/api/auth";
import { useEffect, useState } from "react";

export default function Page() {
  const [userData, setUserData] = useState<MeResponseDTO | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await me();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  return (
    <div className={`pagecontainer ${styles.container}`}>
      <div className={styles.profileInfo}>
        <h2 className={styles.title}>Профиль</h2>
        <LabelledProfileInput name="given_name" label="Имя" placeholder="Введите имя..." />
        <LabelledProfileInput
          name="email"
          type="email"
          label="Почта"
          placeholder="Введите почту..."
          value={userData?.email}
        />
        <LabelledProfileTextarea
          name="about"
          label="О себе"
          placeholder="Расскажите о себе..."
          value={userData?.about}
        />
        <LabelledProfileInput
          name="password"
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
