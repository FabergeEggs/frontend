import styles from "./LabelledAuthInput.module.css";
import AuthInput from "../AuthInput/AuthInput";

interface LabelledAuthInputProps {
  type?: "password" | "email" | "text";
  label: string;
  placeholder: string;
  required?: boolean;
}

export default function LabelledAuthInput({
  type,
  label,
  placeholder,
  required,
}: LabelledAuthInputProps) {
  const visibility = required === false ? 'hidden' : 'visible'
  return (
    <div className={styles.container}>
      <label htmlFor={label}>
        <span className={styles.text}>
          {label}{" "}
          <span style={{ visibility: visibility, color: "red" }}>*</span>
        </span>
        <AuthInput
          type={type}
          id={label}
          placeholder={placeholder}
          required={required}
        ></AuthInput>
      </label>
    </div>
  );
}
