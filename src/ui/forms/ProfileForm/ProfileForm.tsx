"use client";

import ProfileInput from "@/src/ui/inputs/ProfileInput/ProfileInput";
import ProfileTextarea from "@/src/ui/inputs/ProfileInput/ProfileTextarea";
import ProfileInfoField from "../../info/ProfileInfoField/ProfileInfoField";
import styles from "./ProfileForm.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { profileSchema } from "@/src/lib/utils/zodSchemas";
import { updateProfile } from "@/src/lib/api/profile";
import { useAuth } from "@/src/lib/providers/AuthProvider";
import { useRef, useState } from "react"


export default function ProfileForm({ data } : {data : ProfileDTO}) {
  const { register: registerField, setValue } = useForm<z.infer<typeof profileSchema>>({
    mode: "onChange",
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: data.first_name,
      email: data.email,
      about: data.bio,
      oldPassword: "xxxxxxxxxxx",
      newPassword: "",
      confirmPassword: ""
    },
  });
  const [isEditingPassword, setIsEditingPassword] = useState(false);


  const {userId} = useAuth()
  const formRef = useRef<HTMLFormElement>(null)

  function updateProfileWithFormData() {
    if (!formRef.current) return
    const formData = new FormData(formRef.current);
    const formValues = Object.fromEntries(formData.entries());
    
    updateProfile(userId!, {
      first_name: formValues.first_name as string,
      last_name: "",
      bio: formValues.about as string,
      avatar_url: ""
    })
  }

  return (
    <form ref={formRef} className={styles.profileInfo}>
      <ProfileInput
        label="Имя"
        placeholder="Введите имя..."
        onConfirm={updateProfileWithFormData}
        {...registerField("first_name")}
      />
      <ProfileInfoField
        label="Почта"
        value={data.email}
      />
      <ProfileTextarea
        label="О себе"
        placeholder="Расскажите о себе..."
        onConfirm={updateProfileWithFormData}
        {...registerField("about")}
      />
      <ProfileInput
        type="password"
        label="Пароль"
        placeholder="Введите старый пароль..."
        onEditSwitch={() => { setValue("oldPassword", ""); setIsEditingPassword((prev) => !prev)}}
        {...registerField("oldPassword")}
      />
      {isEditingPassword && <>
        <ProfileInput
        type="password"
        label="Новый пароль"
        placeholder="Введите новый пароль..."
        hasEditButton={false}
        {...registerField("newPassword")}
      />
      <ProfileInput
        type="password"
        label="Пароль"
        placeholder="Подтвердите новый пароль..."
        hasEditButton={false}
        {...registerField("confirmPassword")}
      />

      </>}

    </form>
  );
}
