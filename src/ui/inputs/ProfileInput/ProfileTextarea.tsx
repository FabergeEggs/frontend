"use client";

import { useState } from "react";
import styles from "./ProfileInput.module.css";
import TextareaProps from "../TextareaProps";
import EditImage from "@/public/assets/edit.svg";
import Image from "next/image";

/* This element changes its background-color depending on whether the input field is empty or not */
export default function ProfileTextarea({
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
    <div
      className={`basic-input-container ${styles.container} ${styles.textareaContainer} ${className}`}
    >
      <textarea
        className={`basic-input ${styles.input} ${styles.textarea}`}
        onChange={(e) => handleInput(e.target)}
        id={id}
        placeholder={placeholder}
        required={required ?? true}
      />
      <div className={styles.editImageContainer}>
        <Image className={styles.editImage} src={EditImage} alt="Edit" />
      </div>
    </div>
  );
}
