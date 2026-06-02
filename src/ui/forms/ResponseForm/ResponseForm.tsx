"use client"

import styles from "./ResponseForm.module.css"
import CommentTextarea from "../../inputs/CommentTextarea/CommentTextarea"
import FileInput from "../../inputs/FileInput/FileInput"
import ValidationError from "../ValidationError/ValidationError"
import { useState } from "react"
import File from "../../inputs/File/File"
import { useCreateTaskResponse } from "@/src/lib/query/response"
import { getMutationStatus } from "@/src/lib/query/status"

export default function ResponseForm({className, placeholder, projectId, taskId}: {className: string, placeholder: string, projectId: string, taskId: string}) {
    const [text, setText] = useState("")
    const [files, setFiles] = useState<string[]>([])
    const createResponseMutation = useCreateTaskResponse(projectId, taskId)
    const mutationStatus = getMutationStatus(createResponseMutation)

    const handleSubmit = () => {
        if (!text.trim() || mutationStatus.isSubmitting) return
        createResponseMutation.mutate({text, attached_files: files}, {
            onSuccess: () => {
                setText("")
                setFiles([])
            }
        })
    }

    return (
        <div className={`${styles.container} ${className}`}>
            <h2 className={styles.label}>Ваш ответ</h2>
            <CommentTextarea
                placeholder={placeholder}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onSubmit={handleSubmit}
            />
            <div className={styles.fileForm}>
                <FileInput onAdd={(id) => setFiles(prev => [...prev, id])} />
                {files && files.map((value, index) => (
                    <File key={index} name={value} index={index} />
                ))}
            </div>
            {mutationStatus.isError && (
                <ValidationError messages={[mutationStatus.errorMessage ?? "Ошибка создания ответа"]} />
            )}
        </div>
    )
}