"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./AuthForm.module.css";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";
import ValidationError from "../ValidationError/ValidationError";

import { resetPassword } from "@/src/lib/api/auth";
import AuthInput from "../../inputs/AuthInput/AuthInput";

export default function ResetPassword({ resetKey }: { resetKey: string }) {
  const [newPassword, setNewPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const handleSend = () => {
      try {
        console.log("Submitting reset password with data: ", resetKey, newPassword); // DEBUG
        resetPassword(resetKey, newPassword)
          .then((response) => { // <!> .then + try-catch - is it okay?
            router.push("/login") 
            console.log("Reset password response: ", response); // DEBUG
          })
      } catch (error: any) {
        const msg = error.response?.data.error;
        console.error("Reset password failed: ", msg);

        // const status = error.response?.status;
        setServerError("Ошибка входа. Попробуйте позже");
        console.error("Reset password failed: ", error.response);
      }
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewPassword(e.target.value);
    };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <p className={styles.title}>Изменение пароля</p>
        <p className={styles.text}>Для изменения пароля укажите новый пароль. </p>
        <AuthInput
          name="new_password" 
          type="password"
          label="Новый пароль:"
          placeholder="Введите новый пароль..."
          onChange={handleChange}
        />
        <GreenButton
          className={styles.submitBtn}
          onClick={handleSend}
          text="Поменять пароль"
        />
      </div>
      {serverError && <ValidationError messages={[serverError]} />}
    </div>
    
  );
}
