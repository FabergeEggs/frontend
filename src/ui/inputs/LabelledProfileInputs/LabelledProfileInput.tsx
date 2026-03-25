import styles from "./LabelledProfileInput.module.css";
import ProfileInput from "../ProfileInput/ProfileInput";
import LabelledInputProps from "../LabelledInputProps";

export default function LabelledProfileInput({
  type,
  label,
  placeholder,
  required,
}: LabelledInputProps) {
  const visibility = required === false ? "hidden" : "visible";
  return (
    <div className={styles.container}>
      <label htmlFor={label}>
        <span className={styles.text}>
          {label}{" "}
          <span style={{ visibility: visibility, color: "red" }}>*</span>
        </span>
        <ProfileInput
          type={type}
          id={label}
          placeholder={placeholder}
          required={required}
        ></ProfileInput>
      </label>
    </div>
  );
}
