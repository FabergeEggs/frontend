"use client";

import { useState } from "react";
import styles from "./AuthInput.module.css";
import TextareaProps from "../TextareaProps";

/* This element changes its background-color depending on whether the input field is empty or not */
export default function AuthTextarea({
  name,
  id,
  placeholder,
  required,
  onChange,
  onFocus,
  onBlur,
  ref,
}: TextareaProps) {
  const [className, setClassName] = useState(styles.empty);

  function handleInput(target: HTMLTextAreaElement) {
    if (target.value) setClassName("");
    else setClassName(styles.empty);
  }

  return (
    <textarea
      name={name}
      className={`basic-input-container basic-input ${styles.input} ${styles.textarea} ${className}`}
      onChange={(e) => { handleInput(e.target); if (onChange) onChange?.(e); }}
      id={id}
      placeholder={placeholder}
      required={required ?? true}
      ref={ref}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}
