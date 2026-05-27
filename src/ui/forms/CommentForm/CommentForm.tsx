"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./CommentForm.module.css";
import CommentTextarea from "../../inputs/CommentTextarea/CommentTextarea";
import ValidationError from "../ValidationError/ValidationError";
import GreenButton from "../../buttons/GreenButton/GreenButton";
import { useCreatePostComment } from "@/src/lib/query/response";
import { getMutationStatus } from "@/src/lib/query/status";
import { commentSchema } from "@/src/lib/utils/zodSchemas";
import { useAuth } from "@/src/lib/providers/AuthProvider";

type CommentFormData = z.infer<typeof commentSchema>;

export default function CommentForm({
  className,
  placeholder,
  projectId,
  postId,
}: {
  className: string;
  placeholder: string;
  projectId: string;
  postId: string;
}) {
  const { userId } = useAuth();
  const createCommentMutation = useCreatePostComment(projectId, postId, userId);
  const mutationStatus = getMutationStatus(createCommentMutation);

  const {
    setValue,
    watch,
    formState: { isValid, errors },
    reset,
  } = useForm<CommentFormData>({
    mode: "onChange",
    resolver: zodResolver(commentSchema),
    defaultValues: { content: "" },
  });

  const content = watch("content");

  const handleSubmit = async () => {
    if (!isValid || !userId) {
      return;
    }

    try {
      await createCommentMutation.mutateAsync(content);
      reset();
    } catch {
      // Ошибка уже отображается в mutationStatus/error.
    }
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <h2 className={styles.label}>Комментарий</h2>
      <CommentTextarea
              placeholder={placeholder}
              value={content}
              onChange={(e) =>
                setValue("content", e.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              disabledSubmit={!isValid || !userId || mutationStatus.isSubmitting}
              onSubmit={handleSubmit}
            />
      {errors.content?.message && <ValidationError messages={[errors.content.message]} />}
      {mutationStatus.isError && (
        <ValidationError messages={[mutationStatus.errorMessage ?? "Ошибка создания комментария"]} />
      )}
      {!userId && <ValidationError messages={["Не удалось определить пользователя."]} />}
    </div>
  );
}