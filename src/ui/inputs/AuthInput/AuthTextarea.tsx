import styles from "./AuthInput.module.css";
import TextareaProps from "../TextareaProps";

import { useState } from "react";

export default function AuthTextarea({
  name,
  label,
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
    <div className={styles.container}>
      <label htmlFor={label}>
        <span className={styles.text}>{label}</span>
        <textarea
          name={name}
          className={`basic-input-container basic-input ${styles.input} ${styles.textarea} ${className}`}
          onChange={(e) => { handleInput(e.target); if (onChange) onChange?.(e); }}
          id={name}
          placeholder={placeholder}
          required={required ?? true}
          ref={ref}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </label>
    </div>
  );
}
