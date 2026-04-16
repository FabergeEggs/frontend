"use client";

import { useState } from "react";
import styles from "./AuthInput.module.css";
import InputProps from "../InputProps";

/* This element changes its background-color depending on whether the input field is empty or not */
export default function AuthInput({
  name,
  type,
  id,
  placeholder,
  required,
  onChange,
  onFocus,
  onBlur,
  ref,
}: InputProps) {
  const [className, setClassName] = useState(styles.empty);

  function handleInput(target: HTMLInputElement) {
    if (target.value) setClassName("");
    else setClassName(styles.empty);
  }

  return (
    <input
      name={name}
      className={`basic-input-container basic-input ${styles.input} ${className}`}
      onChange={(e) => {
        handleInput(e.target);
        onChange?.(e);
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      type={type ?? "text"}
      id={id}
      placeholder={placeholder}
      required={required ?? true}
      autoComplete="new-password"
      ref={ref}
    />
  );
}
