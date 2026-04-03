import styles from './ValidationError.module.css'
import DangerImage from '@/public/assets/danger.svg'
import CloseImage from '@/public/assets/close.svg'
import Image from 'next/image';

export default function ValidationError({ message }: { message: string }) {
  return (
    <div className={styles.error}>
      <Image src={DangerImage} alt="Error" width={16} height={14} />
      <p>{message}</p>
      <Image src={CloseImage} alt="Close" width={16} height={16} />
    </div>
  );
}