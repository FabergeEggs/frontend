"use client";

import { useState } from "react";
import styles from "./AuthInput.module.css";

interface AuthInputProps {
  type?: "password" | "email" | "text";
  id: string;
  placeholder: string;
  required?: boolean;
}

/* This element changes its background-color depending on whether the input field is empty or not */
export default function AuthInput({
  type,
  id,
  placeholder,
  required,
}: AuthInputProps) {
  const [className, setClassName] = useState(styles.empty);

  function handleInput(target: HTMLInputElement) {
    if (target.value) setClassName("");
    else setClassName(styles.empty);
  }

  return (
    <input
      className={`basic-input ${styles.input} ${className}`}
      onChange={(e) => handleInput(e.target)}
      type={type ?? "text"}
      id={id}
      placeholder={placeholder}
      required={required ?? true}
    />
  );
}
