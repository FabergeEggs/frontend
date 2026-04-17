import styles from "./LabelledAuthInput.module.css";
import AuthInput from "../AuthInput/AuthInput";
import LabelledInputProps from "../LabelledInputProps";

export default function LabelledAuthInput({
  name,
  type,
  label,
  placeholder,
  required,
  value,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
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
          value={value}
          required={required}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          ref={ref}
        />
      </label>
    </div>
  );
}
