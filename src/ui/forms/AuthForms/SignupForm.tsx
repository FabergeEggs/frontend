"use client";

import styles from "./AuthForm.module.css";
import AuthInput from "@/src/ui/inputs/AuthInput/AuthInput";
import AuthTextarea from "../../inputs/AuthInput/AuthTextarea";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";
import TextLink from "@/src/ui/links/TextLink/TextLink";
import ValidationError from "../ValidationError/ValidationError";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signupSchema } from "@/src/lib/utils/zodSchemas";
import { useRegisterMutation } from "@/src/lib/query/auth";
import { getMutationStatus } from "@/src/lib/query/status";

export default function SignupForm() {
  const registerMutation = useRegisterMutation();
  const mutationStatus = getMutationStatus(registerMutation);

  const {
    register: registerField,
    trigger,
    formState: { errors, isValid },
    handleSubmit: handleSubmitHook,
  } = useForm<z.infer<typeof signupSchema>>({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
  });

  const handleSubmit = handleSubmitHook((formValues) => {
    const registerRequestData: RegisterRequestDTO = {
      email: formValues.email,
      password: formValues.password,
      first_name: formValues.first_name,
      last_name: "",
      about: formValues.about,
      phone: "",
    };
    registerMutation.mutate(registerRequestData);
  });

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
            label="Повторите пароль"
            placeholder="Введите пароль ещё раз..."
            {...registerField("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          )}
        </div>
        <GreenButton
          type="submit"
          className={styles.submitBtn}
          disabled={!isValid || mutationStatus.isSubmitting}
          text="Зарегистрироваться"
        />
        <p className={styles.authRef}>
          Уже есть аккаунт?{" "}
          <TextLink className={styles.authRef} href="/login">
            Войдите тут
          </TextLink>
        </p>
      </form>
      {mutationStatus.isError && (
        <ValidationError messages={[mutationStatus.errorMessage ?? "Ошибка регистрации"]} />
      )}
    </div>
  );
}
