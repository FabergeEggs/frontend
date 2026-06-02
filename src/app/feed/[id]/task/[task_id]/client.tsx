"use client";

import styles from "./taskpage.module.css";
import Image from "next/image";
import { Fragment, useMemo, useState } from "react";

import { TaskStatusEnum } from "@/src/lib/models/export/project";
import type { ResponseDTO } from "@/src/lib/models/export/response";
import { ResponseStatus } from "@/src/lib/models/export/response";
import { useAuth } from "@/src/lib/providers/AuthProvider";
import { useTask, useTaskResponses, useUpdateTask } from "@/src/lib/query/project";
import { getQueryStatus } from "@/src/lib/query/status";
import { useChangeResponseStatus } from "@/src/lib/query/response";
import { useProfiles } from "@/src/lib/query/profile";
import ValidationError from "@/src/ui/forms/ValidationError/ValidationError";

import AuthorImage from "@/public/assets/project/author.svg";
import CreationTimeImage from "@/public/assets/project/creation-time.svg";
import StatusActiveImage from "@/public/assets/project/status-active.svg";
import ResponseForm from "@/src/ui/forms/ResponseForm/ResponseForm";
import ResponseCard from "@/src/ui/info/ResponseCard/ResponseCard";
import EditImage from "@/public/assets/edit.svg";
import FinishImage from "@/public/assets/project/finish.svg";
import RestartImage from "@/public/assets/project/restart.svg"

import ImageTextButton from "@/src/ui/buttons/ImageTextButton/ImageTextButton";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";
import BackToProjectLink from "@/src/ui/links/BackToProjectLink/BackToProjectLink";
import AuthInput from "@/src/ui/inputs/AuthInput/AuthInput";
import ProjectTextarea from "@/src/ui/inputs/ProjectInput/ProjectTextarea";
import CancelImage from "@/public/assets/close.svg";

export default function TaskPageClient({
  projectId,
  taskId,
}: {
  projectId: string;
  taskId: string;
}) {
  const { userId } = useAuth();

  const taskQuery = useTask(projectId, taskId);
  const taskStatus = getQueryStatus(taskQuery)
  const task = taskQuery.data;

  const [editing, setEditing] = useState(false);
  const [editLabel, setEditLabel] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editShortDesc, setEditShortDesc] = useState("");

  const responsesQuery = useTaskResponses(projectId, taskId);
  const displayedResponses: ResponseDTO[] = responsesQuery.data ?? [];

  const updateTaskMutation = useUpdateTask(projectId, taskId);
  const changeStatusMutation = useChangeResponseStatus(projectId, taskId);

  const userIds = useMemo(() => {
    return Array.from(new Set(displayedResponses.map((r) => r.user_id)));
  }, [displayedResponses]);

  const profilesQuery = useProfiles(userIds);
  const profiles = profilesQuery.data ?? {};

  if (taskStatus.isLoading) {
    return (
      <div className={`pagecontainer ${styles.container}`}>
        <BackToProjectLink projectId={projectId} />
        <div className="centered">Загрузка задачи…</div>
      </div>
    );
  }

  if (taskStatus.isError || !task) {
    return (
      <div className={`pagecontainer ${styles.container}`}>
        <BackToProjectLink projectId={projectId} />
        <div className="centered">
          <ValidationError
            messages={[taskStatus.errorMessage ?? "Не удалось загрузить задачу"]}
          />
        </div>
      </div>
    );
  }

  const data = task
  const isAdmin = userId === data.creator_id;

  function startEditing() {
    setEditLabel(data.label);
    setEditShortDesc(data.short_description ?? "");
    setEditDescription(data.description ?? "");
    setEditing(true);
  }

  function saveEdit() {
    updateTaskMutation.mutate(
      {
        label: editLabel,
        short_description: editShortDesc,
        description: editDescription,
        status: data.status as TaskStatusEnum,
      },
      { onSuccess: () => setEditing(false) },
    );
  }

  function changeTaskStatus(status: TaskStatusEnum) {
    updateTaskMutation.mutate({
      label: data.label,
      short_description: data.short_description ?? "",
      description: data.description ?? "",
      status: status,
    });
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
                label="Название задачи"
                placeholder="Название задачи"
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
                label="Описание задачи"
                placeholder="Описание задачи"
                height={150}
                value={editDescription}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditDescription(e.target.value)}
                required={false}
              />
              <div className={styles.editActions}>
                <GreenButton
                  text={updateTaskMutation.isPending ? "Сохранение…" : "Сохранить"}
                  onClick={saveEdit}
                  disabled={!editLabel.trim() || updateTaskMutation.isPending}
                />
                <ImageTextButton
                  text="Отмена"
                  src={CancelImage}
                  onClick={() => setEditing(false)}
                />
              </div>
              {updateTaskMutation.isError && (
                <ValidationError messages={["Не удалось сохранить изменения"]} />
              )}
            </div>
          ) : (
            <>
              <h1 className={`basic-flex ${styles.label}`}>
                {data.label}
                {isAdmin && (
                  <div className="basic-flex">
                    <ImageTextButton
                      text="Редактировать"
                      src={EditImage}
                      onClick={startEditing}
                    />
                    {data.status === TaskStatusEnum.ACTIVE && (
                      <ImageTextButton
                        text={updateTaskMutation.isPending ? "…" : "Завершить"}
                        src={FinishImage}
                        onClick={() => changeTaskStatus(TaskStatusEnum.FINISHED)}
                        disabled={updateTaskMutation.isPending}
                      />
                    )}
                    {data.status === TaskStatusEnum.FINISHED && (
                      <ImageTextButton
                        text={updateTaskMutation.isPending ? "…" : "Возобновить"}
                        src={RestartImage}
                        onClick={() => changeTaskStatus(TaskStatusEnum.ACTIVE)}
                        disabled={updateTaskMutation.isPending}
                      />
                    )}
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
            </>
          )}
        </div>
      </div>

      {data.status === TaskStatusEnum.ACTIVE && (
        <ResponseForm
          className={styles.cardPadding}
          placeholder="Напишите свой ответ"
          projectId={projectId}
          taskId={taskId}
        />
      )}

      {displayedResponses.length > 0 && (
        <div className={styles.responses}>
          {displayedResponses.map((value, index) => (
            <Fragment key={value.id ?? index}>
              <ResponseCard
                className={styles.cardPadding}
                {...value}
                username={
                  profiles[value.user_id]?.username ??
                  value.user_name ??
                  "Загрузка..."
                }
                isAdmin={isAdmin}
                onApprove={() =>
                  changeStatusMutation.mutate({
                    responseId: value.id,
                    status: ResponseStatus.ACCEPTED,
                  })
                }
                onReject={() =>
                  changeStatusMutation.mutate({
                    responseId: value.id,
                    status: ResponseStatus.REJECTED,
                  })
                }
              />
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
