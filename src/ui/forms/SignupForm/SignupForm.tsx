"use client";

import styles from "./SignupForm.module.css";
import LabelledAuthInput from "../../inputs/LabelledAuthInput/LabelledAuthInput";
import GreenButton from "../../buttons/GreenButton/GreenButton";
import TextLink from "../../links/TextLink/TextLink";

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
        <LabelledAuthInput
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
      <p>
        У вас уже есть аккаунт? <TextLink href="/login">Войдите тут</TextLink>
      </p>
    </form>
  );
}
