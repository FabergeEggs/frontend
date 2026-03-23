import styles from './LabelledAuthInput.module.css'
import AuthInput from '../AuthInput/AuthInput'

export default function LabelledAuthInput({label, placeholder, required}: {label: string, placeholder: string, required?: boolean}) {
    let visibility: "visible" | "hidden" = "visible";
    if (required != null && required == false) {
        visibility = "hidden";
    }
    return (
        <div className={styles.container}>
            <label htmlFor={label}>
                <span className={styles.text}>{label} <span style={{ visibility: visibility, color: "red" }}>*</span></span>
                <AuthInput id={label} placeholder={placeholder} required={required ?? true}></AuthInput>
            </label>
        </div>
    )
}