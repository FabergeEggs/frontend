"use client";

import styles from "./ProfileInput.module.css";
import InputProps from "../InputProps";
import EditImage from "@/public/assets/edit.svg";
import Image from "next/image";

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
  ref,
}: InputProps) {
  function privet() {
    console.log("AHAAHA!");
  }

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
        value={value}
        required={required ?? true}
        autoComplete="new-password"
        ref={ref}
      />
      <div onClick={() => privet} className={styles.editImageContainer}>
        <Image src={EditImage} alt="Edit" />
      </div>
    </div>
  );
}
