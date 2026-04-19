"use client";

import styles from "./ProfileInput.module.css";
import InputProps from "../InputProps";
import EditImage from "@/public/assets/edit.svg";
import ConfirmImage from "@/public/assets/check.svg"
import Image from "next/image";

import { forwardRef, useState } from "react";

/* This element changes its background-color depending on whether the input field is empty or not */
const ProfileInput = forwardRef<HTMLInputElement, InputProps>(({
  type,
  id,
  placeholder,
  value,
  required,
  onChange,
  onFocus,
  onBlur,
  onConfirm,
  onKeyDown,
  name
}, ref) => {
  const [disabled, setDisabled] = useState(true);

  return (
    <div className={`basic-input-container ${styles.container}`}>
      <input
        className={`basic-input ${styles.input}`}
        onChange={(e) => onChange?.(e)}
        onFocus={onFocus}
        onBlur={onBlur}
        type={type ?? "text"}
        id={id}
        placeholder={placeholder}
        required={required ?? true}
        autoComplete="new-password"
        onKeyDown={onKeyDown}
        ref={ref}
        name={name}
        disabled={disabled}
      />
      { disabled && <div onClick={() => setDisabled(false)} className={styles.imageContainer}>
        <Image src={EditImage} alt="Edit" />
      </div>}
      {!disabled && <div onClick={() => { onConfirm?.(); setDisabled(true)} } className={styles.imageContainer}> 
          <Image src={ConfirmImage} alt="Confirm" />
        </div>}
    </div>
  );
})

ProfileInput.displayName = "ProfileInput"
export default ProfileInput
