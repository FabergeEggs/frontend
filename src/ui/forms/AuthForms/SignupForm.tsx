"use client";

import styles from "./AuthForm.module.css";
import LabelledAuthInput from "@/src/ui/inputs/LabelledAuthInputs/LabelledAuthInput";
import LabelledAuthTextarea from "../../inputs/LabelledAuthInputs/LabelledAuthTextarea";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";
import TextLink from "@/src/ui/links/TextLink/TextLink";

import { useState } from "react";
import { register } from "@/src/lib/api/auth";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  // Явно указываем, что значения не могут быть undefined
  const [formData, setFormData] = useState<RegisterRequestDTO>({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    about: "",
    phone: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }

    try {
      console.log("Submitting registration with data: ", formData);
      const response = await register(formData);
      console.log("Registration successful: ", response);
      router.push("/profile");
    } catch (error: any) {
      const msg = error.response?.data.error;
      console.error(error.response);
      console.error("Registration failed: ", msg);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const { value } = e.target;
    setConfirmPassword(value);
  }


  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <p className={styles.title}>Регистрация</p>
      <div className={styles.inputs}>
        <LabelledAuthInput 
          name="username" 
          label="Имя" 
          placeholder="Введите своё имя..." 
          onChange={handleChange}
          />
        <LabelledAuthInput
          name="email"
          type="email"
          label="Почта"
          placeholder="example@mail.ru"
          onChange={handleChange}
        />
        <LabelledAuthTextarea
          name="about"
          label="О себе"
          placeholder="Расскажите о себе..."
          required={false}
          onChange={handleChange}
        />
        <LabelledAuthInput
          name="password"
          type="password"
          label="Пароль"
          placeholder="Введите пароль..."
          onChange={handleChange}
        />
        <LabelledAuthInput
          name="confirmPassword"
          type="password"
          label="Повтор пароля"
          placeholder="Введите пароль ещё раз..."
          onChange={handleConfirmPasswordChange}
        />
      </div>
      <GreenButton
        type="submit"
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
