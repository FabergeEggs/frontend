"use client";

import { useState } from "react";
import styles from "./AuthForm.module.css";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";
import ValidationError from "../ValidationError/ValidationError";
import SubmitSuccess from "../SubmitSuccess/SubmitSuccess";

import { forgotPassword } from "@/src/lib/api/auth";
import AuthInput from "../../inputs/AuthInput/AuthInput";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { emailSchema } from "@/src/lib/utils/zodSchemas";
import { useForm } from "react-hook-form";

export default function ResetPasswordLink() {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
          register: registerField,
          watch,
          formState: { isValid },
        } = useForm<z.infer<typeof emailSchema>>({
          mode: "onChange",
          resolver: zodResolver(emailSchema),
        });

  const handleSend = async () => {
      try {
        console.log("Submitting reset password with data: ", watch("email")); // DEBUG
        const response = await forgotPassword(watch("email"));
        setSuccess(true);
        console.log("Reset password successful: ", response);
      } catch (error: any) {
        const msg = error.response?.data.error;
        console.error(error.response);
        console.error("Reset password failed: ", msg);

        const status = error.response?.status;
        if (status === 404) {
          setServerError("Пользователя с данной почтой не существует");
        } else {
          setServerError("Ошибка. Попробуйте позже");
        }
        console.error("Reset password failed: ", error.response);
      }
    };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <p className={styles.title}>Восстановление пароля</p>
        <p className={styles.text}>Для восстановления пароля укажите почту вашего аккаунта. На неё будет отправлена дальнейшая инструкция. </p>
        <AuthInput
          type="email"
          label="Почта:"
          placeholder="example@mail.ru"
          {...registerField("email")}
        />
        <GreenButton
          className={styles.submitBtn}
          onClick={handleSend}
          text="Отправить"
          disabled={!isValid}
        />
      </div>
      {serverError && <ValidationError messages={[serverError]} />}
      {success && <SubmitSuccess messages={["Письмо успешно отправлено!"]}/>}
    </div>
    
  );
}
