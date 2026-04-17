"use client";

import styles from "./ProfileInput.module.css";
import InputProps from "../InputProps";
import EditImage from "@/public/assets/edit.svg";
import ConfirmImage from "@/public/assets/check.svg"
import Image from "next/image";

import { useState } from "react";

/* This element changes its background-color depending on whether the input field is empty or not */
export default function ProfileInput({
  type,
  id,
  placeholder,
  value,
  required,
  onChange,
  onFocus,
  onBlur,
  onConfirm,
  ref,
}: InputProps) {
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
        onKeyDown={onConfirm}
        value={value}
        required={required ?? true}
        autoComplete="new-password"
        ref={ref}
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
}
