"use client";

import styles from "./AuthForm.module.css";
import AuthInput from "../../inputs/AuthInput/AuthInput";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";
import TextLink from "@/src/ui/links/TextLink/TextLink";
import ValidationError from "../ValidationError/ValidationError";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/src/lib/utils/zodSchemas";
import { useLoginMutation } from "@/src/lib/query/auth";
import { getMutationStatus } from "@/src/lib/query/status";
import { getApiErrorMessage } from "@/src/lib/api/errors";

export default function LoginForm() {
  const loginMutation = useLoginMutation();
  const mutationStatus = getMutationStatus(loginMutation);

  const {
    register: registerField,
    formState: { isValid },
    handleSubmit: handleSubmitHook,
  } = useForm<z.infer<typeof loginSchema>>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const handleSubmit = handleSubmitHook((data) => {
    loginMutation.mutate(data as LoginRequestDTO);
  });

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <p className={styles.title}>Войти</p>
        <div className={styles.inputs}>
          <AuthInput
            type="email"
            label="Почта"
            placeholder="example@mail.ru"
            {...registerField("login")}
          />
          <AuthInput
            type="password"
            label="Пароль"
            placeholder="Введите пароль..."
            {...registerField("password")}
          />
        </div>
        <p className={styles.resetPasswordRef}>
          <TextLink className={styles.authRef} href="/reset-password">
            Забыли пароль?
          </TextLink>
        </p>
        <GreenButton
          type="submit"
          className={styles.submitBtn}
          disabled={!isValid || mutationStatus.isSubmitting}
          text="Войти"
        />
        <p className={styles.authRef}>
          Ещё нет аккаунта?{" "}
          <TextLink className={styles.authRef} href="/signup">
            Зарегистрируйтесь тут
          </TextLink>
        </p>
      </form>
      {mutationStatus.isError && (
        <ValidationError messages={[mutationStatus.errorMessage ?? "Ошибка входа"]} />
      )}
    </div>
  );
}
