"use client";

import { useState } from "react";
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
}: InputProps) {
  const [className, setClassName] = useState(styles.empty);

  function handleInput(target: HTMLInputElement) {
    if (target.value) setClassName("");
    else setClassName(styles.empty);
  }

  return (
    <div className={`basic-input-container ${styles.container} ${className}`}>
      <input
        className={`basic-input ${styles.input}`}
        onChange={(e) => handleInput(e.target)}
        type={type ?? "text"}
        id={id}
        placeholder={placeholder}
        value={value}
        required={required ?? true}
        autoComplete="new-password"
      />
      <div className={styles.editImageContainer}>
        <Image src={EditImage} alt="Edit" />
      </div>
    </div>
  );
}
