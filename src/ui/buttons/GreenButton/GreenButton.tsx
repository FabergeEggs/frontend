// "use client"

import styles from './GreenButton.module.css'

interface GreenButtonProps {
    text: string
    onClick: () => void
    isActive?: boolean
    width?: string
}

export default function GreenButton({ text, onClick, isActive = false, width }: GreenButtonProps) {
  return (
    <button
      className={`basic-btn ${styles.btn} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      style={width ? { width: `${width}px` } : undefined}
    >
      {text}
    </button>
  )
}