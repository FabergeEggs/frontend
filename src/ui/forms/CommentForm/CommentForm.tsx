"use client"

import styles from "./CommentForm.module.css"
import CommentTextarea from "../../inputs/CommentTextarea/CommentTextarea"

export default function CommentForm({className, placeholder}: {className: string, placeholder: string}) {
    return (
        <div className={`${styles.container} ${className}`}>
            <h2 className={styles.label}>Комментарий</h2>
            <CommentTextarea placeholder={placeholder}/>
        </div>
    )
}