"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./AuthForm.module.css";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";
import ValidationError from "../ValidationError/ValidationError";

import { resetPassword } from "@/src/lib/api/auth";
import AuthInput from "../../inputs/AuthInput/AuthInput";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { passwordSchema } from "@/src/lib/utils/zodSchemas";
import { useForm } from "react-hook-form";

export default function ResetPassword({ resetKey }: { resetKey: string }) {
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const {
    register: registerField,
    trigger,
    watch,
    formState: { isValid },
  } = useForm<z.infer<typeof passwordSchema>>({
    mode: "onChange",
    resolver: zodResolver(passwordSchema),
  });

  const handleSend = () => {
      try {
        console.log("Submitting reset password with data: ", resetKey, watch("password")); // DEBUG
        resetPassword(resetKey, watch("password"))
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

    

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <p className={styles.title}>Изменение пароля</p>
        <p className={styles.text}>Для изменения пароля укажите новый пароль. </p>
        <AuthInput
          type="password"
          label="Новый пароль:"
          placeholder="Введите новый пароль..."
          {...registerField("password")}
        />
        <GreenButton
          className={styles.submitBtn}
          onClick={handleSend}
          text="Поменять пароль"
          disabled={!isValid}
        />
      </div>
      {serverError && <ValidationError messages={[serverError]} />}
    </div>
    
  );
}
