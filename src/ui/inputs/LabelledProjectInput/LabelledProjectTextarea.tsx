import styles from "./LabelledProjectInput.module.css";
import ProjectTextarea from "../ProjectInput/ProjectTextarea";
import LabelledTextareaProps from "../LabelledTextareaProps";

export default function LabelledProjectTextarea({
  name,
  label,
  placeholder,
  required,
  onChange,
  onFocus,
  onBlur,
  ref,
  height
}: LabelledTextareaProps) {
  return (
    <div className={styles.container}>
      <label htmlFor={label}>
        <span className={styles.text}>{label}</span>
        <ProjectTextarea
          name = {name}
          height={height}
          id={label}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={ref}
        ></ProjectTextarea>
      </label>
    </div>
  );
}
