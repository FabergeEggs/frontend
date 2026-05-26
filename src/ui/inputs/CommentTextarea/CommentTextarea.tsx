import styles from './CommentTextarea.module.css'
import Image from "next/image"
import CommentSendImage from "@/public/assets/project/comment_send.svg"

interface CommentTextAreaProps {
    placeholder: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    onSubmit?: () => void
    disabledSubmit?: boolean
}

export default function CommentTextarea({placeholder, value, onChange, onSubmit, disabledSubmit}: CommentTextAreaProps) {
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
                <Image 
                    onClick={onSubmit} 
                    className={`basic-btn ${styles.image} ${disabledSubmit ? "basic-btn-disabled" : ""}`} 
                    src={CommentSendImage} 
                    alt="Comment send image" 
                    style={{ cursor: disabledSubmit ? "default" : "pointer" }}
                />
            </div>
        </div>
        
    )
}