import styles from "./ProfileInput.module.css";
import EditImage from "@/public/assets/edit.svg";
import ConfirmImage from "@/public/assets/check.svg"
import Image from "next/image";
import ProfileInputProps from "../ProfileInputProps";
import { useState } from "react";


export default function ProfileInput({
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
    ref,
    onEditSwitch,
    hasEditButton = true,
  }: ProfileInputProps) {

  const [disabled, setDisabled] = useState(hasEditButton);
  const visibility = required === true && !value ? "visible" : "hidden";
  return (
  <div className={styles.container}>
    <label htmlFor={label}>
      <span className={styles.text}>
        {label}{" "}
        <span style={{ visibility: visibility, color: "red" }}>*</span>
      </span>
      <div className={`basic-input-container ${styles.inputContainer}`}>
        <input
          className={`basic-input ${styles.input}`}
          onChange={(e) => onChange?.(e)}
          onFocus={onFocus}
          onBlur={onBlur}
          type={type ?? "text"}
          id={name}
          placeholder={placeholder}
          required={required ?? true}
          autoComplete="new-password"
          onKeyDown={onKeyDown}
          ref={ref}
          name={name}
          disabled={disabled}
        />
        {hasEditButton && <>
          { disabled && <div onClick={() => { setDisabled(false); onEditSwitch?.()}} className={styles.imageContainer}>
          <Image src={EditImage} alt="Edit" />
        </div>}
        {!disabled && <div onClick={() => { onConfirm?.(); setDisabled(true); onEditSwitch?.()} } className={styles.imageContainer}> 
            <Image src={ConfirmImage} alt="Confirm" />
          </div>}
        </>
        } 

        
      </div>
    </label>
  </div>)
}
