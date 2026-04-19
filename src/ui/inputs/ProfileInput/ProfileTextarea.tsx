"use client";

import styles from "./ProfileInput.module.css";
import TextareaProps from "../TextareaProps";
import EditImage from "@/public/assets/edit.svg";
import ConfirmImage from "@/public/assets/check.svg"
import Image from "next/image";

import { useState } from "react";

/* This element changes its background-color depending on whether the input field is empty or not */
export default function ProfileTextarea({
  id,
  placeholder,
  required,
  name,
  ref,
  onConfirm
}: TextareaProps) {
  const [disabled, setDisabled] = useState(true);

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
        disabled={disabled}
        name={name}
        ref={ref}
      />
      { disabled && <div onClick={() => setDisabled(false)} className={styles.imageContainer}>
        <Image src={EditImage} alt="Edit" />
      </div>}
      {!disabled && <div onClick={() => { onConfirm?.(); setDisabled(true)}} className={styles.imageContainer}> 
          <Image src={ConfirmImage} alt="Confirm" />
        </div>}
    </div>
  );
}
