import styles from './CommentTextarea.module.css'
import Image from "next/image"
import CommentSendImage from "@/public/assets/project/comment_send.svg"

interface CommentTextAreaProps {
    placeholder: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function CommentTextarea({placeholder, value, onChange}: CommentTextAreaProps) {
    return (
        <div className={`basic-input-container ${styles.textareaContainer}`}>
            <textarea 
                className={`basic-input ${styles.textarea}`} 
                name="comment" 
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <div className={`basic-btn ${styles.imageContainer}`}>
                <Image className={styles.image} src={CommentSendImage} alt="Comment send image"></Image>
            </div>
        </div>
        
    )
}