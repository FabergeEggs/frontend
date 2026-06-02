import styles from './File.module.css'
import Image from "next/image"
import RemoveImage from "@/public/assets/close.svg"


function filenameFromUrl(url: string): string {
    try {
        const pathname = new URL(url).pathname;
        const decoded = decodeURIComponent(pathname.split("/").pop() ?? "");
        return decoded || url;
    } catch {
        return url;
    }
}

export default function File({name, index}: {name: string, index: number}) {
    return (<div className={`basic-box ${styles.file}`} key={index}>
                        {filenameFromUrl(name)}
                        <Image className={styles.removeImage} src={RemoveImage} alt="Remove file"/>
                    </div>)
}