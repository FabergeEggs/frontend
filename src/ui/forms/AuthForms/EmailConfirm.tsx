"use client";

import { useEffect, useState } from "react";
import styles from "./AuthForm.module.css";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";
import ValidationError from "../ValidationError/ValidationError";
import { useEmailResendMutation } from "@/src/lib/query/auth";
import { getMutationStatus } from "@/src/lib/query/status";

const COOLDOWN_SECONDS = 300; // 5 минут

export default function EmailConfirm({ email }: { email: string }) {
  const [cooldown, setCooldown] = useState(COOLDOWN_SECONDS);
  const emailResendMutation = useEmailResendMutation();
  const mutationStatus = getMutationStatus(emailResendMutation);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    if (emailResendMutation.isSuccess) {
      setCooldown(COOLDOWN_SECONDS);
    }
  }, [emailResendMutation.isSuccess]);

  const handleSend = () => {
    emailResendMutation.mutate(email);
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
      {mutationStatus.isError && (
        <ValidationError messages={[mutationStatus.errorMessage ?? "Ошибка отправки"]} />
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
        disabled={cooldown > 0 || mutationStatus.isSubmitting}
      />
    </div>
  );
}
