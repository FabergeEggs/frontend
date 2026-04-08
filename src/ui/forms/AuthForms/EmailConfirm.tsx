"use client";

import { useEffect, useState } from "react";
import styles from "./AuthForm.module.css";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";

import { emailResendVerification } from "@/src/lib/api/auth";

const COOLDOWN_SECONDS = 300; // 5 минут

export default function EmailConfirm({ email }: { email: string }) {
  const [cooldown, setCooldown] = useState(COOLDOWN_SECONDS);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSend = async () => {
    setError(null);
    try {
      console.log("Resending email confirm to:", email); // DEBUG
      const response = await emailResendVerification(email);
      setCooldown(COOLDOWN_SECONDS); // сбрасываем таймер
      console.log("Email confirm successful: ", response);
    } catch (error: any) {
      const status = error.response?.status;
      if (status === 404) {
        setError("Пользователя с данной почтой не существует");
      } else if (status === 429) {
        setError("Слишком много запросов. Подождите немного");
      } else {
        setError("Не удалось отправить письмо. Попробуйте позже");
      }
      console.error("Email confirm failed:", error.response);
    }
  };

  const formatCooldown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`${styles.container} ${styles.form}`}>
      <p className={styles.title}>Подтверждение почты</p>
      <p className={styles.text}>
        На указанный вами адрес электронной почты <strong>{email}</strong> было
        отправлено письмо для её подтверждения.{" "}
      </p>
      {error && (
        <p style={{ color: "var(--danger-color)", margin: 0 }}>{error}</p>
      )}
      <p className={styles.subtitle}>Письмо не пришло?</p>
      <p className={styles.text}>
        Повторную отправку письма можно делать не чаще, чем 1 раз в 5 минут
      </p>
      <GreenButton
        className={styles.submitBtn}
        onClick={handleSend}
        text={
          cooldown > 0
            ? `Отправить ещё раз (${formatCooldown(cooldown)})`
            : "Отправить ещё раз"
        }
        disabled={cooldown > 0}
      />
    </div>
  );
}
