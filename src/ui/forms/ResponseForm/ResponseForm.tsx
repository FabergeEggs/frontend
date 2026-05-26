"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./ResponseForm.module.css";
import CommentTextarea from "../../inputs/CommentTextarea/CommentTextarea";
import FileInput from "../../inputs/FileInput/FileInput";
import ValidationError from "../ValidationError/ValidationError";
import GreenButton from "../../buttons/GreenButton/GreenButton";
import FileChip from "../../inputs/File/File";
import { useCreateTaskResponse } from "@/src/lib/query/response";
import { getMutationStatus } from "@/src/lib/query/status";
import { responseSchema } from "@/src/lib/utils/zodSchemas";
import { useAuth } from "@/src/lib/providers/AuthProvider";

type ResponseFormData = z.infer<typeof responseSchema>;

export default function ResponseForm({
  className,
  placeholder,
  projectId,
  taskId,
}: {
  className: string;
  placeholder: string;
  projectId: string;
  taskId: string;
}) {
  const { userId } = useAuth();
  const [files, setFiles] = useState<globalThis.File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const createResponseMutation = useCreateTaskResponse(projectId, taskId, userId);
  const mutationStatus = getMutationStatus(createResponseMutation);

  const {
    setValue,
    watch,
    formState: { isValid, errors },
    reset,
  } = useForm<ResponseFormData>({
    mode: "onChange",
    resolver: zodResolver(responseSchema),
    defaultValues: { text: "" },
  });

  const text = watch("text");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFiles = Array.from(event.target.files ?? []);
    setFiles((prev) => [...prev, ...nextFiles]);
    event.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!isValid || !userId) {
      return;
    }

    try {
      await createResponseMutation.mutateAsync({ text, files });
      reset();
      setFiles([]);
    } catch {
      // Ошибка уже отображается в mutationStatus/error.
    }
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <h2 className={styles.label}>Ваш ответ</h2>
      <CommentTextarea
        placeholder={placeholder}
        value={text}
        onChange={(e) =>
          setValue("text", e.target.value, {
            shouldValidate: true,
            shouldDirty: true,
          })
        }
        disabledSubmit={!isValid || !userId || mutationStatus.isSubmitting}
        onSubmit={handleSubmit}
      />
      <div className={styles.fileForm}>
        <FileInput onClick={() => fileInputRef.current?.click()} />
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {files.map((value, index) => (
          <FileChip
            key={`${value.name}-${index}`}
            name={value.name}
            index={index}
            onRemove={() => removeFile(index)}
          />
        ))}
      </div>
      {errors.text?.message && <ValidationError messages={[errors.text.message]} />}
      {mutationStatus.isError && (
        <ValidationError messages={[mutationStatus.errorMessage ?? "Ошибка создания ответа"]} />
      )}
      {!userId && <ValidationError messages={["Не удалось определить пользователя."]} />}
    </div>
  );
}