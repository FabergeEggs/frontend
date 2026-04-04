import styles from "./LabelledAuthInput.module.css";
import AuthInput from "../AuthInput/AuthInput";
import LabelledInputProps from "../LabelledInputProps";

export default function LabelledAuthInput({
  name,
  type,
  label,
  placeholder,
  required,
  onChange,
  onFocus,
  onBlur,
  ref,
}: LabelledInputProps) {
  const visibility = required === false ? "hidden" : "visible";
  return (
    <div className={styles.container}>
      <label htmlFor={label}>
        <span className={styles.text}>
          {label}{" "}
          <span style={{ visibility, color: "red" }}>*</span>
        </span>
        <AuthInput
          name={name}
          type={type}
          id={label}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={ref}
        />
      </label>
    </div>
  );
}
