"use client";

import { useState } from "react";
import styles from "./AuthInput.module.css";
import TextareaProps from "../TextareaProps";

/* This element changes its background-color depending on whether the input field is empty or not */
export default function AuthTextarea({
  id,
  placeholder,
  required,
}: TextareaProps) {
  const [className, setClassName] = useState(styles.empty);

  function handleInput(target: HTMLTextAreaElement) {
    if (target.value) setClassName("");
    else setClassName(styles.empty);
  }

  return (
    <textarea
      className={`basic-input-container basic-input ${styles.input} ${styles.textarea} ${className}`}
      onChange={(e) => handleInput(e.target)}
      id={id}
      placeholder={placeholder}
      required={required ?? true}
    />
  );
}
