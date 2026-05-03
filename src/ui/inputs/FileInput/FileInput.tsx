import styles from './FileInput.module.css'
import Image from 'next/image'
import FileImage from '@/public/assets/response/file.svg'

export default function FileInput() {
    return (
        // TODO: прочитать статью про FIle Input и реализовать <!>
        // <label htmlFor="">
        //     <input type="file" />
        // </label>
        
        <div className={`basic-box basic-btn ${styles.container}`}>
            <Image className={styles.image} src={FileImage} alt="file"/>
            Прикрепить файл
        </div>
    )
}