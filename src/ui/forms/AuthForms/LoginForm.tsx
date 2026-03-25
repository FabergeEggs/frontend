"use client";

import styles from "./AuthForm.module.css";
import LabelledAuthInput from "@/src/ui/inputs/LabelledAuthInputs/LabelledAuthInput";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";
import TextLink from "@/src/ui/links/TextLink/TextLink";

export default function LoginForm() {
  return (
    <form className={styles.form}>
      <p className={styles.title}>Войти</p>
      <div className={styles.inputs}>
        <LabelledAuthInput type="email" label="Почта" placeholder="Введите почту..." />
        <LabelledAuthInput
          type="password"
          label="Пароль"
          placeholder="Введите пароль..."
        />
      </div>
      <p className={styles.resetPasswordRef}>
        <TextLink className={styles.authRef} href="/reset-password">
          Забыли пароль?
        </TextLink>
      </p>
      <GreenButton
        className={styles.submitBtn}
        text="Войти"
        onClick={() => console.log("Login")}
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
