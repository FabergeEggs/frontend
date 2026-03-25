import styles from "./LabelledProfileInput.module.css";
import ProfileTextarea from "../ProfileInput/ProfileTextarea";
import LabelledTextareaProps from "../LabelledTextareaProps";

export default function LabelledProfileTextarea({
  label,
  placeholder,
  required,
}: LabelledTextareaProps) {
  return (
    <div className={styles.container}>
      <label htmlFor={label}>
        <span className={styles.text}>{label}</span>
        <ProfileTextarea
          id={label}
          placeholder={placeholder}
          required={required}
        ></ProfileTextarea>
      </label>
    </div>
  );
}
