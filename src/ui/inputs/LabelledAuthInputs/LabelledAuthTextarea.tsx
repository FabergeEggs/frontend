import styles from "./LabelledAuthInput.module.css";
import AuthTextarea from "../AuthInput/AuthTextarea";
import LabelledTextareaProps from "../LabelledTextareaProps";

export default function LabelledAuthTextarea({
  label,
  placeholder,
  required,
}: LabelledTextareaProps) {
  return (
    <div className={styles.container}>
      <label htmlFor={label}>
        <span className={styles.text}>{label}</span>
        <AuthTextarea
          id={label}
          placeholder={placeholder}
          required={required}
        ></AuthTextarea>
      </label>
    </div>
  );
}
