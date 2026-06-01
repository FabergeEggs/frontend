import styles from './TransparentTextImageButton.module.css';
import Image from "next/image";

interface TransparentTextImageButtonProps {
  text: string;
  src: string;
  onClick?: (() => void) | ((e: any) => void);
  imageFirst?: boolean;
  className?: string;
  hideText?: boolean;
  hideTextAtPx?: number;
  color?: string;
}

export default function TransparentTextImageButton({
  text,
  src,
  onClick,
  imageFirst = false,
  className = "",
  hideText = false,
  hideTextAtPx = 675,
  color
}: TransparentTextImageButtonProps) {
  return (
    <>
    {hideText && <style>{`@media(max-width: ${hideTextAtPx}px) {
                    .transparentButtonText {
                      display: none;
                    }

                }`}</style>}
    <span className={`${styles.container} ${className}`} onClick={onClick} role={onClick ? "button" : undefined}>
        {!imageFirst && <>
          <span className="transparentButtonText" style={{color}}>{text}</span>
          <Image className={styles.image} src={src} alt={text} />
        </>}
        {imageFirst && <>
          <Image className={styles.image} src={src} alt={text} />
          <span className="transparentButtonText" style={{color}}>{text}</span>
        </>}
    </span>
    </>
  );
}
