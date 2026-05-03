"use client"

import styles from "./ResponseForm.module.css"
import CommentTextarea from "../../inputs/CommentTextarea/CommentTextarea"
import FileInput from "../../inputs/FileInput/FileInput"
import { useState } from "react"
import File from "../../inputs/File/File"

export default function ResponseForm({className, placeholder}: {className: string, placeholder: string}) {
    const [files, setFiles] = useState(["goida.txt", "goida.txt", "goida.txt"])

    return (
        <div className={`${styles.container} ${className}`}>
            <h2 className={styles.label}>Ваш ответ</h2>
            <CommentTextarea placeholder={placeholder}/>
            <div className={styles.fileForm}>
                <FileInput />
                {files && files.map((value, index) => (
                    <File key={index} name={value} index={index} />
                ))}
            </div>
        </div>
    )
}