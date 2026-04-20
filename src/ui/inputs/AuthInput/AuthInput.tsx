import styles from "./AuthInput.module.css";
import InputProps from "../InputProps";

export default function AuthInput({
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
}: InputProps) {
  const starVisibility = required === false ? "hidden" : "visible";
  const className = value ? "" : styles.empty;
  return (
    <div className={styles.container}>
      <label htmlFor={label}>
        <span className={styles.text}>
          {label}{" "}
          <span style={{ visibility: starVisibility, color: "red" }}>*</span>
        </span>
        <input
          name={name}
          className={`basic-input-container basic-input ${styles.input} ${className}`}
          value={value}
          onChange={(e) => {
            onChange?.(e);
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          type={type ?? "text"}
          id={name}
          placeholder={placeholder}
          required={required ?? true}
          autoComplete="new-password"
          ref={ref}
        />
      </label>
    </div>
  );
}
