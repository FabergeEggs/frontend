"use client";

import { useState } from "react";
import styles from "./AuthForm.module.css";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";
import ValidationError from "../ValidationError/ValidationError";

import { resetPassword } from "@/src/lib/api/auth";
import AuthInput from "../../inputs/AuthInput/AuthInput";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [serverError, setServerError] = useState("");

  const handleSend = async () => {
      try {
        console.log("Submitting reset password with data: ", email); // DEBUG
        const response = await resetPassword(email);
        console.log("Reset password successful: ", response);
      } catch (error: any) {
        const msg = error.response?.data.error;
        console.error(error.response);
        console.error("Reset password failed: ", msg);

        const status = error.response?.status;
        if (status === 404) {
          setServerError("Пользователя с данной почтой не существует");
        } else {
          setServerError("Ошибка входа. Попробуйте позже");
        }
        console.error("Reset password failed: ", error.response);
      }
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      setEmail(e.target.value);
    };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <p className={styles.title}>Восстановление пароля</p>
        <p className={styles.text}>Для восстановления пароля укажите почту вашего аккаунта. На неё будет отправлена дальнейшая инструкция. </p>
        <AuthInput
          name="email" 
          type="email"
          label="Почта:"
          placeholder="example@mail.ru"
          onChange={handleChange}
        />
        <GreenButton
          className={styles.submitBtn}
          onClick={handleSend}
          text="Отправить"
        />
      </div>
      {serverError && <ValidationError messages={[serverError]} />}
    </div>
    
  );
}
