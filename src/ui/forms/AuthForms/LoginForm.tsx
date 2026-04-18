"use client";

import styles from "./AuthForm.module.css";
import LabelledAuthInput from "@/src/ui/inputs/LabelledAuthInputs/LabelledAuthInput";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";
import TextLink from "@/src/ui/links/TextLink/TextLink";
import ValidationError from "../ValidationError/ValidationError";

import { useState } from "react";
import { login } from "@/src/lib/api/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/src/lib/utils/zodSchemas";

export default function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register: registerField,
    formState: { isValid },
  } = useForm<z.infer<typeof loginSchema>>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setServerError(null);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const formValues = Object.fromEntries(formData.entries());
    const loginData: LoginRequestDTO = {
      login: formValues.login as string,
      password: formValues.password as string,
    };

    try {
      console.log("Submitting login with data: ", loginData); // DEBUG
      const response = await login(loginData);
      console.log("Login successful: ", response);
      router.push("/profile");
    } catch (error: any) {
      const msg = error.response?.data.error;
      console.error(error.response);
      console.error("Login failed: ", msg);

      const status = error.response?.status;
      if (status === 401) {
        setServerError("Неверный логин или пароль");
      } else {
        setServerError("Ошибка входа. Попробуйте позже");
      }
      console.error("Login failed: ", error.response);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <p className={styles.title}>Войти</p>
        <div className={styles.inputs}>
          <LabelledAuthInput
            type="email"
            label="Почта"
            placeholder="example@mail.ru"
            {...registerField("login")}
          />
          <LabelledAuthInput
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
          disabled={!isValid}
          text="Войти"
        />
        <p className={styles.authRef}>
          Ещё нет аккаунта?{" "}
          <TextLink className={styles.authRef} href="/signup">
            Зарегистрируйтесь тут
          </TextLink>
        </p>
      </form>
      {serverError && <ValidationError messages={[serverError]} />}
    </div>
  );
}
