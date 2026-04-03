"use client";

import { useState } from "react";
import styles from "./AuthForm.module.css";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";

import { emailConfirm } from "@/src/lib/api/auth";

export default function EmailConfirm({email}: {email: string}) {
  const [sent, setSent] = useState(true);

  const handleSend = async () => { 
    setSent(true);
    try {
      console.log("Sending email confirm again ", email);
      const response = await emailConfirm(email);
      console.log("Email confirm successful: ", response);
    } catch (error: any) {
      const msg = error.response?.data.error;
      console.error(error.response);
      console.error("Email confirm failed: ", msg);
    }
  }

  return (
    <div className={`${styles.container} ${styles.form}`}>
      <p className={styles.title}>Подтверждение почты</p>
      <p className={styles.text}>На указанный вами адрес электронной почты {email} было отправлено письмо для её подтверждения. </p>
      <p className={styles.subtitle}>
        Письмо не пришло?
      </p>
      <p className={styles.text}>Повторную отправку письма можно делать не чаще, чем 1 раз в 5 минуту</p>
      <GreenButton
        className={styles.submitBtn}
        onClick={handleSend}
        text="Отправить ещё раз"
        disabled={sent}
      />
    </div>
  );
}
