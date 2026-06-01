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
import { changePassword } from "@/src/lib/api/auth";
import { useAuth } from "@/src/lib/providers/AuthProvider";
import { useRef, useState } from "react"

export default function ProfileForm({ data, avatarUrl } : {data : ProfileDTO, avatarUrl: string}) {
  const { register: registerField, setValue, trigger, formState: { errors, dirtyFields }, } = useForm<z.infer<typeof profileSchema>>({
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
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [failedConfirm, setFailedConfirm] = useState({
    first_name: false,
    email: false,
    about: false,
    oldPassword:false,
    newPassword: false,
    confirmPassword: false
  })

  function confirm(field: "first_name" | "about") {
    if (errors[field]) {
      setFailedConfirm((prev) => ({...prev, [field]: true}))
      return false;
    }
    else {
      setFailedConfirm((prev) => ({...prev, [field]: false}))
      updateProfileWithFormData()
      return true;
    }
  }


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
      avatar_url: avatarUrl
    })
  }

  async function updatePassword() {
    trigger(["oldPassword", "newPassword", "confirmPassword"]);
    setPasswordError(null);
    setPasswordSuccess(false);
    
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const formValues = Object.fromEntries(formData.entries());

    if (
      errors.oldPassword || errors.newPassword || errors.confirmPassword ||
      !formValues.oldPassword || !formValues.newPassword || !formValues.confirmPassword
    ) {
      return;
    }
    
    try {
      await changePassword(
        formValues.oldPassword as string,
        formValues.newPassword as string,
      );
      setValue("oldPassword", "xxxxxxxxxxx");
      setValue("newPassword", "");
      setValue("confirmPassword", "");
      setIsEditingPassword(false);
      setPasswordSuccess(true);
    } catch {
      setPasswordError("Не удалось сменить пароль. Проверьте старый пароль.");
      return false;
    }
  }

  return (
    <form ref={formRef} className={styles.profileInfo}>
      <ProfileInput
        label="Имя"
        placeholder="Введите имя..."
        onConfirm={() => confirm("first_name")}
        {...registerField("first_name")}
      />
      {failedConfirm.first_name && (
        <p className={styles.error}>Введено пустое имя</p>
      )}
      <ProfileInfoField
        label="Почта"
        value={data.email}
      />
      <ProfileTextarea
        label="О себе"
        placeholder="Расскажите о себе..."
        onConfirm={() => confirm("about")}
        {...registerField("about")}
      />
      {/* {failedConfirm.about && (
        <p className={styles.error}>Введено пустое описание</p>
      )} */}
      <ProfileInput
        type="password"
        label="Пароль"
        placeholder="Введите старый пароль..."
        onStartEdit={() => { setValue("oldPassword", ""); setIsEditingPassword((prev) => !prev)}}
        onConfirm={updatePassword}
        onSuccessConfirm={() => setIsEditingPassword((prev) => !prev)}
        {...registerField("oldPassword")}
      />
      {errors.oldPassword && (
            <p className={styles.error}>{errors.oldPassword.message}</p>
          )}
      {isEditingPassword && <>
        <ProfileInput
        type="password"
        label="Новый пароль"
        placeholder="Введите новый пароль..."
        hasEditButton={false}
        hasConfirmButton={false}
        {...registerField("newPassword", {
              onChange: () => trigger("confirmPassword"),
            })}
      />
      {errors.newPassword && (
            <p className={styles.error}>{errors.newPassword.message}</p>
          )}
      <ProfileInput
        type="password"
        label="Пароль"
        placeholder="Подтвердите новый пароль..."
        hasEditButton={false}
        hasConfirmButton={false}
        {...registerField("confirmPassword")}
      />
      {dirtyFields.confirmPassword && errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          )}

      </>}

      {passwordError && (
        <p className={styles.error}>{passwordError}</p>
      )}
      {passwordSuccess && (
        <p style={{ color: "var(--success-color, green)", marginTop: "4px" }}>
          Пароль успешно изменён
        </p>
      )}

    </form>
  );
}
