"use client";

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
  return (
    <div
      className={`basic-input-container ${styles.container} ${styles.textareaContainer}`}
    >
      <textarea
        className={`basic-input ${styles.input} ${styles.textarea}`}
        id={id}
        placeholder={placeholder}
        required={required ?? true}
        autoComplete="new-password"
      />
      <div className={styles.editImageContainer}>
        <Image className={styles.editImage} src={EditImage} alt="Edit" />
      </div>
    </div>
  );
}
