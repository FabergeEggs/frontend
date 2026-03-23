// "use client"

import styles from './GreenButton.module.css'

interface GreenButtonProps {
    text: string
    onClick?: () => void
    isActive?: boolean
    width?: string
    className?: string
}

export default function GreenButton({ text, onClick, isActive = false, width, className }: GreenButtonProps) {
  return (
    <button
      className={`basic-btn ${styles.btn} ${isActive ? styles.active : ''} ${className ?? ''}`}
      onClick={onClick}
      style={width ? { width: `${width}px` } : undefined}
    >
      {text}
    </button>
  )
}