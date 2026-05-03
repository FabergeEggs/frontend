import styles from './ImageTextButton.module.css';
import Image from "next/image";

interface ImageTextButtonProps {
  text: string;
  src: string;
  color?: string;
  backgroundColor?: string;
  type?: "submit" | "reset" | "button" | undefined;
  hideText?: boolean;
  hideTextAtPx?: number;
  onClick?: () => void;
}


// Bordered button
export default function ImageTextButton({
  text,
  src,
  color="var(--active-dark-color)",
  backgroundColor="var(--varity2-color)",
  type,
  hideText = false,
  hideTextAtPx = 675,
  onClick,
}: ImageTextButtonProps) {
  return (
    <>
      {hideText && <style>{`@media(max-width: ${hideTextAtPx}px) {
                    .imageTextButtonText {
                      display: none;
                    }

                }`}</style>}
      <button
        type={type}
        className={`basic-btn ${styles.container}`}
        onClick={onClick}
        style={{ color, backgroundColor }}
      >
        <Image src={src} alt={text} />
        <span className={`imageTextButtonText ${styles.text}`}>{text}</span>
      </button>
    </>
    
  );
}
