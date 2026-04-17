import styles from './TextImageButton.module.css';
import Image from "next/image";

interface TextImageButtonProps {
  text: string;
  src: string;
  onClick?: () => void;
}

export default function TextImageButton({
  text,
  src,
  onClick,
}: TextImageButtonProps) {
  return (
    <div className={styles.container} onClick={onClick}>
        <span className={styles.text}>{text}</span>
        <Image src={src} alt={text} />
    </div>
  );
}
