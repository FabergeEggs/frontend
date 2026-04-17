"use client";

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
  onKeyDown,
  value,
  ref,
}: InputProps) {
  const className = value ? "" : styles.empty;

  return (
    <input
      name={name}
      className={`basic-input-container basic-input ${styles.input} ${className}`}
      value={value}
      onChange={(e) => {
        onChange?.(e);
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      type={type ?? "text"}
      id={id}
      placeholder={placeholder}
      required={required ?? true}
      autoComplete="new-password"
      ref={ref}
    />
  );
}
