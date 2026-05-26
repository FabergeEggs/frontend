import styles from "./FilterButton.module.css";

interface FilterButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  width?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
  chosen?: boolean; // Indicates if the button is currently selected/active
}

// This button usually plays the role of SUBMIT button
export default function FilterButton({
  text,
  onClick,
  disabled = false,
  width,
  className,
  type = "button",
  style,
  chosen = false,
}: FilterButtonProps) {
  return (
    <button
      className={`${styles.btn} basic-btn ${disabled ? styles.disabled : ""} ${chosen ? styles.chosen : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={{width, ...style}}
    >
      {text}
    </button>
  );
}
