import styles from "./ProfileInput.module.css";
import EditImage from "@/public/assets/edit.svg";
import ConfirmImage from "@/public/assets/check.svg"
import Image from "next/image";
import TextareaProps from "../TextareaProps";
import { useState } from "react";

export default function ProfileTextarea({
    label,
    placeholder,
    required,
    name,
    ref,
    onConfirm
  }: TextareaProps) {

  const [disabled, setDisabled] = useState(true);
  return (
    <div className={styles.container}>
      <label htmlFor={label}>
        <span className={styles.text}>{label}</span>
        <div
      className={`basic-input-container ${styles.container} ${styles.textareaContainer}`}
        >
          <textarea
            className={`basic-input ${styles.input} ${styles.textarea}`}
            id={name}
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
      </label>
    </div>
  );
}
