import styles from "./AuthInput.module.css";
import InputProps from "../InputProps";
import { useState } from "react";

export default function AuthInput({
  name,
  type,
  label,
  placeholder,
  required,
  value,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  ref,
}: InputProps) {
  const starVisibility = required === false ? "hidden" : "visible";
  // const [className, setClassName] = useState(styles.empty);

  // function handleInput(target: HTMLInputElement) {
  //   if (target.value) setClassName("");
  //   else setClassName(styles.empty);
  // }
  return (
    <div className={styles.container}>
      <label htmlFor={label}>
        <span className={styles.text}>
          {label}{" "}
          <span style={{ visibility: starVisibility, color: "red" }}>*</span>
        </span>
        <div className={`basic-input-container ${styles.inputContainer}`}>
          <input
            name={name}
            className={`basic-input ${styles.input}`}
            value={value}
            onChange={(e) => {
              onChange?.(e);
            }}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            type={type ?? "text"}
            id={name}
            placeholder={placeholder}
            required={required ?? true}
            autoComplete="new-password"
            ref={ref}
          />
        </div>
      </label>
    </div>
  );
}
