import styles from './FileInput.module.css'
import Image from 'next/image'
import FileImage from '@/public/assets/response/file.svg'

export default function FileInput({ onClick }: { onClick?: () => void }) {
    return (
        <button type="button" className={`basic-box basic-btn ${styles.container}`} onClick={onClick}>
            <Image className={styles.image} src={FileImage} alt="file"/>
            Прикрепить файл
        </button>
    )
}