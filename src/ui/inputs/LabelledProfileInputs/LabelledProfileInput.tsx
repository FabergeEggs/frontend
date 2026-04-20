import styles from "./LabelledProfileInput.module.css";
import ProfileInput from "../ProfileInput/ProfileInput";
import LabelledInputProps from "../LabelledInputProps";
import { forwardRef } from "react";

export default function LabelledProfileInput({
    type,
    label,
    placeholder,
    value,
    required,
    onChange,
    onFocus,
    onBlur,
    onConfirm,
    onKeyDown,
    name,
    ref
  }: LabelledInputProps) {

  const visibility = required === true && !value ? "visible" : "hidden";
  return (
    <div className={styles.container}>
      <label htmlFor={label}>
        <span className={styles.text}>
          {label}{" "}
          <span style={{ visibility: visibility, color: "red" }}>*</span>
        </span>
        <ProfileInput
          type={type}
          id={label}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onConfirm={onConfirm}
          onKeyDown={onKeyDown}
          ref={ref}
          name={name}
        ></ProfileInput>
      </label>
    </div>)
  }