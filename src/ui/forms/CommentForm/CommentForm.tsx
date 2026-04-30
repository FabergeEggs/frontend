import styles from "./CommentForm.module.css"
import CommentTextarea from "../../inputs/CommentTextarea/CommentTextarea"
import FileInput from "../../inputs/FileInput/FileInput"

export default function CommentForm({className, placeholder}: {className: string, placeholder: string}) {
    return (
        <div className={`${styles.container} ${className}`}>
            <h2 className={styles.label}>Ваш ответ</h2>
            <CommentTextarea placeholder={placeholder}/>
            <div className={styles.fileForm}>
                <FileInput />
                <div className={styles.attachedFiles}>
                    
                </div>
            </div>
        </div>
    )
}