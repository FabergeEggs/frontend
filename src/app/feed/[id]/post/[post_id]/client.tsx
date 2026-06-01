"use client";

import styles from "./postpage.module.css";
import Image from "next/image";
// import { usePost, usePostComments } from "@/src/lib/query/project";
// import { useProfiles } from "@/src/lib/query/profile";
import { getMockPost, getMockPostComments, getMockProfile } from "@/src/lib/api/mockData";
// import { getQueryStatus } from "@/src/lib/query/status";
import ValidationError from "@/src/ui/forms/ValidationError/ValidationError";
import AuthorImage from "@/public/assets/project/author.svg";
import CreationTimeImage from "@/public/assets/project/creation-time.svg";
import CommentForm from "@/src/ui/forms/CommentForm/CommentForm";
import CommentCard from "@/src/ui/info/CommentCard/CommentCard";
import { useMemo } from "react";

export default function PostPageClientMock({
  projectId,
  postId,
}: {
  projectId: string;
  postId: string;
}) {
  // const postQuery = usePost(projectId, postId);
  // const postStatus = getQueryStatus(postQuery);
  const postStatus = { isLoading: false, isError: false, errorMessage: null };
  const data = getMockPost(projectId, postId);

  // const commentsQuery = usePostComments(projectId, postId);
  // const commentsStatus = getQueryStatus(commentsQuery);
  // const comments = commentsQuery.data ?? [];
  const commentsStatus = { isLoading: false, isError: false, errorMessage: null };
  const comments = getMockPostComments(projectId, postId);

  // Extract unique user IDs from comments
  const userIds = useMemo(() => {
    return Array.from(new Set(comments.map((c) => c.user_id)));
  }, [comments]);

  // Load profiles for all users
  // const profilesQuery = useProfiles(userIds);
  // const profiles = profilesQuery.data ?? {};
  const profiles = Object.fromEntries(
    userIds.map((userId) => [userId, getMockProfile(userId)]),
  ) as Record<string, { username: string }>;

  if (postStatus.isLoading) {
    return <div className="centered">Загрузка поста…</div>;
  }

  // if (postStatus.isError || !postQuery.data) {
  if (postStatus.isError || !data) {
    return (
      <div className="centered">
        <ValidationError
          messages={[postStatus.errorMessage ?? "Не удалось загрузить пост"]}
        />
      </div>
    );
  }

  // const data = postQuery.data;

  return (
    <div className={`pagecontainer ${styles.container}`}>
      <div className={styles.taskContainer}>
        <div className={`${styles.card} ${styles.cardPadding}`}>
          <h1 className={styles.label}>{data.label}</h1>
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
        </div>
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
            <CommentCard
              className={styles.cardPadding}
              {...value}
              username={profiles[value.user_id]?.username ?? "Загрузка..."}
              key={value.id ?? index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
