"use client";

import styles from "./taskpage.module.css";
import Image from "next/image";
import { useMemo } from "react";

import { TaskStatusEnum } from "@/src/lib/models/export/project";
import { ResponseStatus } from "@/src/lib/models/export/response";
import { useAuth } from "@/src/lib/providers/AuthProvider";
import { useTask } from "@/src/lib/query/project";
import {
  useChangeTaskResponseStatus,
  useDeleteTaskResponse,
  useTaskResponses,
} from "@/src/lib/query/response";
import { useProfiles } from "@/src/lib/query/profile";
import { getQueryStatus } from "@/src/lib/query/status";
import ValidationError from "@/src/ui/forms/ValidationError/ValidationError";

import AuthorImage from "@/public/assets/project/author.svg";
import CreationTimeImage from "@/public/assets/project/creation-time.svg";
import StatusActiveImage from "@/public/assets/project/status-active.svg";
import ResponseForm from "@/src/ui/forms/ResponseForm/ResponseForm";
import ResponseCard from "@/src/ui/info/ResponseCard/ResponseCard";
import EditImage from "@/public/assets/edit.svg";
import FinishImage from "@/public/assets/project/finish.svg";

import ImageTextButton from "@/src/ui/buttons/ImageTextButton/ImageTextButton";

export default function TaskPageClient({
  projectId,
  taskId,
}: {
  projectId: string;
  taskId: string;
}) {
  const taskQuery = useTask(projectId, taskId);
  const taskStatus = getQueryStatus(taskQuery);
  const { userId } = useAuth();
  const responsesQuery = useTaskResponses(taskId);
  const responses = responsesQuery.data ?? [];
  const deleteResponseMutation = useDeleteTaskResponse(projectId, taskId);
  const changeStatusMutation = useChangeTaskResponseStatus(projectId, taskId);

  // Extract unique user IDs from responses
  const userIds = useMemo(() => {
    return Array.from(new Set(responses.map((r) => r.user_id)));
  }, [responses]);

  // Load profiles for all users
  const profilesQuery = useProfiles(userIds);
  const profiles = profilesQuery.data ?? {};

  if (taskStatus.isLoading) {
    return <div className="centered">Загрузка задачи…</div>;
  }

  if (taskStatus.isError || !taskQuery.data) {
    return (
      <div className="centered">
        <ValidationError
          messages={[taskStatus.errorMessage ?? "Не удалось загрузить задачу"]}
        />
      </div>
    );
  }

  const data = taskQuery.data;
  const isAdmin = userId === data.creator_id;

  return (
    <div className={`pagecontainer ${styles.container}`}>
      <div className={styles.taskContainer}>
        <div className={`${styles.card} ${styles.cardPadding}`}>
          <h1 className={`basic-flex ${styles.label}`}>
            {data.label}
            {isAdmin && (
              <div className="basic-flex">
                <ImageTextButton
                  text="Редактировать"
                  src={EditImage}
                />
                <ImageTextButton text="Завершить" src={FinishImage} />
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
            <div className="basic-info-piece">
              <Image src={StatusActiveImage} alt="active status image" />
              <span className={styles.infoDescription}>Статус:</span>
              {data.status === TaskStatusEnum.ACTIVE && "Активен"}
              {data.status === TaskStatusEnum.FINISHED && "Завершён"}
              {data.status === TaskStatusEnum.DELETED && "Удалён"}
            </div>
          </div>
          <p className={styles.description}>{data.description}</p>
        </div>
      </div>
      <ResponseForm
        className={styles.cardPadding}
        placeholder="Напишите свой ответ"
        projectId={projectId}
        taskId={taskId}
      />

      {responses.length > 0 && (
        <div className={styles.responses}>
          {responses.map((value, index) => (
            <ResponseCard
              className={styles.cardPadding}
              {...value}
              username={profiles[value.user_id]?.username ?? "Загрузка..."}
              key={index}
              isAdmin={isAdmin}
              canDelete={userId === value.user_id || isAdmin}
              onDelete={() => deleteResponseMutation.mutate(value.id)}
              onAccept={() =>
                changeStatusMutation.mutate({
                  responseId: value.id,
                  status: ResponseStatus.ACCEPTED,
                })
              }
              onDecline={() =>
                changeStatusMutation.mutate({
                  responseId: value.id,
                  status: ResponseStatus.REJECTED,
                })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
