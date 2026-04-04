"use client";

import styles from "./AuthForm.module.css";
import LabelledAuthInput from "@/src/ui/inputs/LabelledAuthInputs/LabelledAuthInput";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";
import TextLink from "@/src/ui/links/TextLink/TextLink";

import { useState } from "react";
import { login } from "@/src/lib/api/auth";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  // Явно указываем, что значения не могут быть undefined
  const [formData, setFormData] = useState<LoginRequestDTO>({
    login: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Submitting login with data: ", formData); // DEBUG
      const response = await login(formData);
      console.log("Login successful: ", response);
      router.push("/profile");
    } catch (error: any) {
      const msg = error.response?.data.error;
      console.error(error.response);
      console.error("Login failed: ", msg);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  return (
    <form onSubmit={handleSubmit} className={`${styles.container} ${styles.form}`}>
      <p className={styles.title}>Войти</p>
      <div className={styles.inputs}>
        <LabelledAuthInput
          name="login"  // login is an email
          type="email"
          label="Почта"
          placeholder="example@mail.ru"
          onChange={handleChange}
        />
        <LabelledAuthInput
          name="password"
          type="password"
          label="Пароль"
          placeholder="Введите пароль..."
          onChange={handleChange}
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
        text="Войти"
      />
      <p className={styles.authRef}>
        Ещё нет аккаунта?{" "}
        <TextLink className={styles.authRef} href="/signup">
          Зарегистрируйтесь тут
        </TextLink>
      </p>
    </form>
  );
}
