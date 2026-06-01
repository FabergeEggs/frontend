import styles from './File.module.css'
import Image from "next/image"
import RemoveImage from "@/public/assets/close.svg"


export default function File({name, index}: {name: string, index: number}) {
    return (<div className={`basic-box ${styles.file}`} key={index}>
                        {name}
                        <Image className={styles.removeImage} src={RemoveImage} alt="Remove file"/>
                    </div>)
}