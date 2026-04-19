"use client";

import LabelledProfileInput from "@/src/ui/inputs/LabelledProfileInputs/LabelledProfileInput";
import LabelledProfileTextarea from "@/src/ui/inputs/LabelledProfileInputs/LabelledProfileTextarea";
import styles from "./ProfileForm.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { profileSchema } from "@/src/lib/utils/zodSchemas";
import { updateProfile } from "@/src/lib/api/profile";
import { useAuth } from "@/src/lib/providers/AuthProvider";
import { useRef } from "react"


export default function ProfileForm({ data } : {data : ProfileDTO}) {
  const { register: registerField, watch } = useForm<z.infer<typeof profileSchema>>({
    mode: "onChange",
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: data.first_name,
      email: data.email,
      password: "xxxxxxxxxxx",
      confirmPassword: "",
      about: data.bio,
    },
  });

  const {userId} = useAuth()
  const formRef = useRef<HTMLFormElement>(null)

  function updateProfileWithFormData() {
    if (!formRef.current) return
    const formData = new FormData(formRef.current);
    const formValues = Object.fromEntries(formData.entries());
    console.log(formValues)
    
    updateProfile(userId!, {
      first_name: formValues.first_name as string,
      last_name: "",
      bio: formValues.about as string,
      avatar_url: ""
    })
  }

  return (
    <form ref={formRef} className={styles.profileInfo}>
      <LabelledProfileInput
        label="Имя"
        placeholder="Введите имя..."
        onConfirm={updateProfileWithFormData}
        {...registerField("first_name")}
      />
      <LabelledProfileInput
        type="email"
        label="Почта"
        placeholder="Введите почту..."
        {...registerField("email")}
      />
      <LabelledProfileTextarea
        label="О себе"
        placeholder="Расскажите о себе..."
        onConfirm={updateProfileWithFormData}
        {...registerField("about")}
      />
      <LabelledProfileInput
        type="password"
        label="Пароль"
        placeholder="Введите пароль..."
      />
    </form>
  );
}
