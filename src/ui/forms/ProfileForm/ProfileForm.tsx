"use client";

import LabelledProfileInput from "@/src/ui/inputs/LabelledProfileInputs/LabelledProfileInput";
import LabelledProfileTextarea from "@/src/ui/inputs/LabelledProfileInputs/LabelledProfileTextarea";
import styles from "./ProfileForm.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { profileSchema } from "@/src/lib/utils/zodSchemas";

import { useEffect } from "react";

export default function ProfileForm({ data } : {data : MeResponseDTO}) {
  const { register: registerField } = useForm<z.infer<typeof profileSchema>>({
    mode: "onChange",
    resolver: zodResolver(profileSchema),
    // defaultValues: {
    //   first_name: "Алексей",
    //   email: "lexander@gmail.com",
    //   password: "",
    //   confirmPassword: "",
    //   about: "Великий учёный 19-го века",
    // },
    defaultValues: {
      first_name: data.given_name,
      email: data.email,
      password: "xxxxxxxxxxx",
      confirmPassword: "",
      about: data.about,
    },
  });

  useEffect(() => {
    // const fetchUserData = async () => {
    //   const data = await me();
    //   setUserData(data);
    // };
    // fetchUserData();
  }, []);

  return (
    <div className={styles.profileInfo}>
      <LabelledProfileInput
        label="Имя"
        placeholder="Введите имя..."
        {...registerField("first_name")}
      />
      <LabelledProfileInput
        type="email"
        label="Почта"
        placeholder="Введите почту..."
        onConfirm={() => console.log("HAh!")}
        {...registerField("email")}
      />
      <LabelledProfileTextarea
        label="О себе"
        placeholder="Расскажите о себе..."
        {...registerField("about")}
      />
      <LabelledProfileInput
        type="password"
        label="Пароль"
        placeholder="Введите пароль..."
      />
    </div>
  );
}
