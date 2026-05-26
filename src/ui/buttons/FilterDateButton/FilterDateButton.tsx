import styles from "./FilterDateButton.module.css";
import CalendarImageDisabled from '@/public/assets/feed/calendarDisabled.svg'
import CalendarImageEnabled from '@/public/assets/feed/calendarEnabled.svg'
import Image from "next/image";
import FilterButton from "../FilterButton/FilterButton";

interface FilterDateButtonProps {
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
export default function FilterDateButton({
  text,
  onClick,
  disabled = false,
  width,
  className,
  type = "button",
  style,
  chosen = false,
}: FilterDateButtonProps) {
  return (
    <button
      className={`${styles.btn} basic-btn ${disabled ? styles.disabled : ""} ${chosen ? styles.chosen : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={{width, ...style}}
    >
      {text}
      {chosen && <Image src={CalendarImageEnabled} alt="Calendar Enabled" style={{marginLeft: '8px'}} />}
      {!chosen && <Image src={CalendarImageDisabled} alt="Calendar Disabled" style={{marginLeft: '8px'}} />}
    </button>
  );
}
