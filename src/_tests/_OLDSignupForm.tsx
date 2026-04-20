// Просто легаси файл, для понимания того, наскольк ужасно всё без React-Hook-form и валидации через zod)

"use client";

import styles from "./AuthForm.module.css";
import AuthInput from "@/src/ui/inputs/AuthInput/AuthInput";
import AuthTextarea from "../ui/inputs/AuthInput/AuthTextarea";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";
import TextLink from "@/src/ui/links/TextLink/TextLink";
import ValidationError from "../ui/forms/ValidationError/ValidationError";

import { useState, useEffect } from "react";
import { register } from "@/src/lib/api/auth";
import { useRouter } from "next/navigation";

import {
  validatePassword,
  isPasswordValid,
  validateEmail,
  type PasswordValidation,
} from "@/src/lib/validation";

export default function SignupForm() {
  const [formData, setFormData] = useState<RegisterRequestDTO>({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    about: "",
    phone: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");   // There's no "confirmPassword" field in the backend, so we keep it separate from formData

  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
    minLength: false,
    minDigits: false,
    minSpecial: false,
  });

  const [emailValid, setEmailValid] = useState(true);
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);
  const [submitActive, setSubmitActive] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const pwd = validatePassword(formData.password);
    const passwordIsValid = isPasswordValid(pwd)
    setPasswordValidation(pwd);

    const emailIsValid = validateEmail(formData.email);
    setEmailValid(emailIsValid);

    const passwordIsConfirmed = formData.password === confirmPassword;
    setPasswordConfirmed(passwordIsConfirmed)

    setSubmitActive(
      formData.first_name.trim() !== "" &&
      emailIsValid &&
      passwordIsValid &&
      passwordIsConfirmed
    );
  }, [formData.password, formData.email, confirmPassword])

  // Собираем ошибки пароля для отображения

  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const checkPassword = () => {
    const tempPasswordErrors = [];
    
    if (!passwordValidation.minLength) tempPasswordErrors.push("минимум 8 символов");
    if (!passwordValidation.minDigits) tempPasswordErrors.push("минимум 2 цифры");
    if (!passwordValidation.minSpecial) tempPasswordErrors.push("минимум 1 спецсимвол (!@#$%^&* и др.)");
    setPasswordErrors(tempPasswordErrors);
  }
  
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const checkEmail = () => {
    if (!emailValid)
      setEmailErrors(["Неверный формат почты"]);
    else
      setEmailErrors([]);
  }

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setServerError(null);

    try {
      const response = await register(formData);
      router.push(`/email-confirm?email=${encodeURIComponent(formData.email)}`)
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

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
  };


  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <p className={styles.title}>Регистрация</p>
        <div className={styles.inputs}>
          <AuthInput
            name="first_name"
            label="Имя"
            placeholder="Введите своё имя..."
            onChange={handleChange}
          />
          <AuthInput
            name="email"
            type="email"
            label="Почта"
            placeholder="example@mail.ru"
            onChange={handleChange}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => { setEmailFocused(false); checkEmail(); }}
          />
          {!emailFocused &&emailErrors.length > 0 && 
          <p className={styles.error}>Неверный формат почты</p> 
          }
          <AuthTextarea
            name="about"
            label="О себе"
            placeholder="Расскажите о себе..."
            required={false}
            onChange={handleChange}
          />
          <AuthInput
            name="password"
            type="password"
            label="Пароль"
            placeholder="Введите пароль..."
            onChange={handleChange}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => { setPasswordFocused(false); checkPassword(); }}
          />
          {!passwordFocused && passwordErrors.length > 0 && 
          <p className={styles.error}> Пароль не соответствует требованиям: {passwordErrors[0]}</p> 
          }
          <AuthInput
            name="confirmPassword"
            type="password"
            label="Повтор пароля"
            placeholder="Введите пароль ещё раз..."
            onChange={handleConfirmPasswordChange}
            onFocus={() => setConfirmPasswordFocused(true)}
            onBlur={() => { setConfirmPasswordTouched(true); setConfirmPasswordFocused(false);}}
          />
          {confirmPasswordTouched && !confirmPasswordFocused && !passwordFocused && !passwordConfirmed && (
            <p className={styles.error}> Пароли не совпадают</p>
          )}
        </div>
        <GreenButton
          type="submit"
          disabled={!submitActive}
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
