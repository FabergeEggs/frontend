"use client";

import styles from "./AuthForm.module.css";
import LabelledAuthInput from "@/src/ui/inputs/LabelledAuthInputs/LabelledAuthInput";
import LabelledAuthTextarea from "../../inputs/LabelledAuthInputs/LabelledAuthTextarea";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";
import TextLink from "@/src/ui/links/TextLink/TextLink";

export default function SignupForm() {
  return (
    <form className={styles.form}>
      <p className={styles.title}>Регистрация</p>
      <div className={styles.inputs}>
        <LabelledAuthInput label="Имя" placeholder="Введите своё имя..." />
        <LabelledAuthInput
          type="email"
          label="Почта"
          placeholder="example@mail.ru"
        />
        <LabelledAuthTextarea
          label="О себе"
          placeholder="Расскажите о себе..."
          required={false}
        />
        <LabelledAuthInput
          type="password"
          label="Пароль"
          placeholder="Введите пароль..."
        />
        <LabelledAuthInput
          type="password"
          label="Повтор пароля"
          placeholder="Введите пароль ещё раз..."
        />
      </div>
      <GreenButton
        className={styles.submitBtn}
        text="Зарегистрироваться"
        onClick={() => console.log("Registration")}
      />
      <p className={styles.authRef}>
        У вас уже есть аккаунт?{" "}
        <TextLink className={styles.authRef} href="/login">
          Войдите тут
        </TextLink>
      </p>
    </form>
  );
}
