"use client"

import styles from "./CommentForm.module.css"
import CommentTextarea from "../../inputs/CommentTextarea/CommentTextarea"
import ValidationError from "../ValidationError/ValidationError"
import GreenButton from "../../buttons/GreenButton/GreenButton"
import { useState } from "react"
import { useCreatePostComment } from "@/src/lib/query/response"
import { getMutationStatus } from "@/src/lib/query/status"

export default function CommentForm({className, placeholder, projectId, postId}: {className: string, placeholder: string, projectId: string, postId: string}) {
    const [content, setContent] = useState("")
    const createCommentMutation = useCreatePostComment(projectId, postId)
    const mutationStatus = getMutationStatus(createCommentMutation)

    const handleSubmit = () => {
        if (!content.trim()) return
        createCommentMutation.mutate(content, {
            onSuccess: () => setContent("")
        })
    }

    return (
        <div className={`${styles.container} ${className}`}>
            <h2 className={styles.label}>Комментарий</h2>
            <CommentTextarea 
                placeholder={placeholder}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            {mutationStatus.isError && (
                <ValidationError messages={[mutationStatus.errorMessage ?? "Ошибка создания комментария"]} />
            )}
            <GreenButton
                text="Отправить"
                disabled={!content.trim() || mutationStatus.isSubmitting}
                onClick={handleSubmit}
                style={{marginTop: "10px"}}
            />
        </div>
    )
}