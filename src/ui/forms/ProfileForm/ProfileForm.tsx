"use client";

import LabelledProfileInput from "@/src/ui/inputs/LabelledProfileInputs/LabelledProfileInput";
import LabelledProfileTextarea from "@/src/ui/inputs/LabelledProfileInputs/LabelledProfileTextarea";
import { me } from "@/src/lib/api/auth";
import { useLayoutEffect, useState } from "react";
import styles from "./ProfileForm.module.css";

export default function ProfileForm() {
  const [userData, setUserData] = useState<MeResponseDTO | null>(null);

  // useLayoutEffect(() => {
  //   const fetchUserData = async () => {
  //     const data = await me();
  //     setUserData(data);
  //   };
  //   fetchUserData();
  // }, []);

  return (
    <div className={styles.profileInfo}>
      <LabelledProfileInput
        name="given_name"
        label="Имя"
        placeholder="Введите имя..."
      />
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
  );
}
