import styles from './GreenButton.module.css'

interface GreenButtonProps {
    text: string
    onClick?: () => void
    isActive?: boolean
    width?: string
    className?: string
    type?: "button" | "submit" | "reset"
}

export default function GreenButton({ text, onClick, isActive = false, width, className, type }: GreenButtonProps) {
  return (
    <button
      className={`basic-btn ${styles.btn} ${isActive ? styles.active : ''} ${className ?? ''}`}
      onClick={onClick}
      type={type ?? 'button'}
      style={width ? { width: `${width}px` } : undefined}
    >
      {text}
    </button>
  )
}