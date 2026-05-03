import styles from "./GreenButton.module.css";

interface GreenButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  width?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

// This button usually plays the role of SUBMIT button
export default function GreenButton({
  text,
  onClick,
  disabled = false,
  width,
  className,
  type = "button",
}: GreenButtonProps) {
  return (
    <button
      className={`${styles.btn} basic-btn ${disabled ? styles.disabled : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={{width}}
    >
      {text}
    </button>
  );
}
