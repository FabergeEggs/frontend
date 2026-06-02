"use client";

import styles from "./postpage.module.css";
import Image from "next/image";
import { usePost, usePostComments, useUpdatePost } from "@/src/lib/query/project";
import { useProfiles } from "@/src/lib/query/profile";
import { getQueryStatus } from "@/src/lib/query/status";
import ValidationError from "@/src/ui/forms/ValidationError/ValidationError";
import AuthorImage from "@/public/assets/project/author.svg";
import CancelImage from "@/public/assets/close.svg"
import EditImage from "@/public/assets/edit.svg";
import CreationTimeImage from "@/public/assets/project/creation-time.svg";
import CommentForm from "@/src/ui/forms/CommentForm/CommentForm";
import CommentCard from "@/src/ui/info/CommentCard/CommentCard";
import BackToProjectLink from "@/src/ui/links/BackToProjectLink/BackToProjectLink";
import { Fragment, useMemo } from "react";
import { useAuth } from "@/src/lib/providers/AuthProvider";
import { useState } from "react";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";
import AuthInput from "@/src/ui/inputs/AuthInput/AuthInput";
import ProjectTextarea from "@/src/ui/inputs/ProjectInput/ProjectTextarea";
import ImageTextButton from "@/src/ui/buttons/ImageTextButton/ImageTextButton";

export default function PostPageClient({
  projectId,
  postId,
}: {
  projectId: string;
  postId: string;
}) {
  const { userId } = useAuth();

  const postQuery = usePost(projectId, postId);
  const postStatus = getQueryStatus(postQuery);
  const post = postQuery.data;

  const [editing, setEditing] = useState(false);
  const [editLabel, setEditLabel] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editShortDesc, setEditShortDesc] = useState("");

  const commentsQuery = usePostComments(projectId, postId);
  const commentsStatus = getQueryStatus(commentsQuery);
  const comments = commentsQuery.data ?? [];

  const updatePostMutation = useUpdatePost(projectId, postId);

  const userIds = useMemo(() => {
    return Array.from(new Set(comments.map((c) => c.user_id)));
  }, [comments]);

  const profilesQuery = useProfiles(userIds);
  const profiles = profilesQuery.data ?? {};

  if (postStatus.isLoading) {
    return (
      <div className={`pagecontainer ${styles.container}`}>
        <BackToProjectLink projectId={projectId} />
        <div className="centered">Загрузка поста…</div>
      </div>
    );
  }

  if (postStatus.isError || !post) {
    return (
      <div className={`pagecontainer ${styles.container}`}>
        <BackToProjectLink projectId={projectId} />
        <div className="centered">
          <ValidationError
            messages={[postStatus.errorMessage ?? "Не удалось загрузить пост"]}
          />
        </div>
      </div>
    );
  }

  const data = post
  const isAdmin = userId === data.creator_id;

  function startEditing() {
    setEditLabel(data.label);
    setEditShortDesc(data.short_description ?? "");
    setEditDescription(data.description ?? "");
    setEditing(true);
  }

  function saveEdit() {
    updatePostMutation.mutate(
      {
        project_id: projectId,
        label: editLabel,
        short_description: editShortDesc,
        description: editDescription,
      },
      { onSuccess: () => setEditing(false) },
    );
  }
  

  return (
    <div className={`pagecontainer ${styles.container}`}>
      <BackToProjectLink projectId={projectId} />
      <div className={styles.taskContainer}>
        <div
          className={`${styles.card} ${styles.cardPadding}`}
        >
          {/* ── Inline edit form ── */}
          {isAdmin && editing ? (
            <div className={styles.editForm}>
              <AuthInput
                label="Название поста"
                placeholder="Название поста"
                value={editLabel}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditLabel(e.target.value)}
                required={false}
              />
              <AuthInput
                label="Краткое описание"
                placeholder="Краткое описание"
                value={editShortDesc}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditShortDesc(e.target.value)}
                required={false}
              />
              <ProjectTextarea
                label="Описание поста"
                placeholder="Описание поста"
                height={150}
                value={editDescription}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditDescription(e.target.value)}
                required={false}
              />
              <div className={styles.editActions}>
                <GreenButton
                  text={updatePostMutation.isPending ? "Сохранение…" : "Сохранить"}
                  onClick={saveEdit}
                  disabled={!editLabel.trim() || updatePostMutation.isPending}
                />
                {/* <ImageTextButton
                  text="Отмена"
                  src={CancelImage}
                  onClick={() => setEditing(false)}
                /> */}
              </div>
              {updatePostMutation.isError && (
                <ValidationError messages={["Не удалось сохранить изменения"]} />
              )}
            </div>
          ) : (
            <>
              <h1 className={styles.label}>{data.label}
                {isAdmin && (
                  <div className="basic-flex">
                    <ImageTextButton
                      text="Редактировать"
                      src={EditImage}
                      onClick={startEditing}
                    />
                  </div>
                )}
              </h1>
              <div className={styles.info}>
                <div className="basic-info-piece">
                  <Image src={AuthorImage} alt="author image" />
                  <span className={styles.infoDescription}>Автор:</span>
                  {data.creator}
                </div>
                <div className="basic-info-piece">
                  <Image src={CreationTimeImage} alt="creation time image" />
                  <span className={styles.infoDescription}>Создано:</span>
                  {new Date(data.created_at).toLocaleDateString("ru-RU")}
                </div>
              </div>
              <p className={styles.description}>{data.description}</p>
            </>
          )}
        </div>
        <CommentForm
          className={styles.cardPadding}
          placeholder="Напишите свой комментарий"
          projectId={projectId}
          postId={postId}
        />

      {commentsStatus.isLoading && (
        <div className="centered">Загрузка комментариев…</div>
      )}

      {commentsStatus.isError && (
        <div className="centered">
          <ValidationError
            messages={[String(commentsStatus.errorMessage)]}
          />
        </div>
      )}

      {comments.length > 0 && (
        <div className={styles.responses}>
          {comments.map((value, index) => (
            <Fragment key={value.id ?? index}>
              <CommentCard
                className={styles.cardPadding}
                {...value}
                username={profiles[value.user_id]?.username ?? "Загрузка..."}
                avatar_url={profiles[value.user_id]?.avatar_url}
              />
            </Fragment>
          ))}
        </div>
      )}
    </div>
  </div>
  );
}
