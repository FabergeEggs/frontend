import styles from "./GreenButton.module.css";

interface GreenButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  width?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function GreenButton({
  text,
  onClick,
  disabled = false,
  width,
  className,
  type,
}: GreenButtonProps) {
  return (
    <button
      className={`${styles.btn} ${disabled ? "basic-btn-disabled" : "basic-btn"} ${disabled ? styles.disabled : ""} ${className ?? ""}`}
      onClick={onClick}
      disabled={disabled}
      type={type ?? "button"}
      style={width ? { width: `${width}px` } : undefined}
    >
      {text}
    </button>
  );
}
