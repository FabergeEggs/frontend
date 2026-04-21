"use client";

import styles from "./AuthForm.module.css";
import AuthInput from "@/src/ui/inputs/AuthInput/AuthInput";
import AuthTextarea from "../../inputs/AuthInput/AuthTextarea";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";
import TextLink from "@/src/ui/links/TextLink/TextLink";
import ValidationError from "../ValidationError/ValidationError";

import { useState } from "react";
import { register } from "@/src/lib/api/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signupSchema } from "@/src/lib/utils/zodSchemas";

export default function SignupForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register: registerField,
    trigger,
    formState: { errors, dirtyFields, isValid },
  } = useForm<z.infer<typeof signupSchema>>({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setServerError(null);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const formValues = Object.fromEntries(formData.entries());

    const registerRequestData: RegisterRequestDTO = {
      email: formValues.email as string,
      password: formValues.password as string,
      first_name: formValues.first_name as string,
      last_name: "",
      about: formValues.about as string,
      phone: "",
    };

    try {
      await register(registerRequestData);
      router.push(
        `/email-confirm?email=${encodeURIComponent(registerRequestData.email)}`,
      );
    } catch (error: any) {
      const status = error.response?.status;
      if (status === 409) {
        setServerError("Пользователь с такой почтой уже существует");
      } else {
        setServerError("Ошибка регистрации. Попробуйте позже");
      }
      console.error("Registration failed: ", error.response);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <p className={styles.title}>Регистрация</p>
        <div className={styles.inputs}>
          <AuthInput
            label="Имя"
            placeholder="Введите своё имя..."
            {...registerField("first_name")}
          />
          <AuthInput
            type="email"
            label="Почта"
            placeholder="example@mail.ru"
            {...registerField("email")}
          />
          {errors.email && (
            <p className={styles.error}>Неверный формат почты</p>
          )}
          <AuthTextarea
            label="О себе"
            placeholder="Расскажите о себе..."
            required={false}
            {...registerField("about")}
          />
          <AuthInput
            type="password"
            label="Пароль"
            placeholder="Введите пароль..."
            {...registerField("password", {
              onChange: () => trigger("confirmPassword"),
            })}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
          <AuthInput
            type="password"
            label="Повтор пароля"
            placeholder="Введите пароль ещё раз..."
            {...registerField("confirmPassword")}
          />
          {dirtyFields.confirmPassword && errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          )}
        </div>
        <GreenButton
          type="submit"
          disabled={!isValid}
          className={styles.submitBtn}
          text="Зарегистрироваться"
        />
        <p className={styles.authRef}>
          У вас уже есть аккаунт?{" "}
          <TextLink className={styles.authRef} href="/login">
            Войдите тут
          </TextLink>
        </p>
      </form>
      {serverError && <ValidationError messages={[serverError]} />}
    </div>
  );
}
