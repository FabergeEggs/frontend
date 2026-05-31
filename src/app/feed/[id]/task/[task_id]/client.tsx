"use client";

import styles from "./taskpage.module.css";
import Image from "next/image";
import { useMemo, useState } from "react";

import { TaskStatusEnum } from "@/src/lib/models/export/project";
import type { ResponseDTO } from "@/src/lib/models/export/response";
import { ResponseStatus } from "@/src/lib/models/export/response";
import { useAuth } from "@/src/lib/providers/AuthProvider";
import { useTask, useTaskResponses, useUpdateTask } from "@/src/lib/query/project";
import { useProfiles } from "@/src/lib/query/profile";
import { useChangeResponseStatus } from "@/src/lib/query/response";
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
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";

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

  // Edit form state
  const [editing, setEditing] = useState(false);
  const [editLabel, setEditLabel] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editShortDesc, setEditShortDesc] = useState("");

  // Live responses — client-side only (no SSR fallback needed)
  const responsesQuery = useTaskResponses(projectId, taskId);
  const displayedResponses: ResponseDTO[] = responsesQuery.data ?? [];

  // Mutations
  const updateTaskMutation = useUpdateTask(projectId, taskId);
  const changeStatusMutation = useChangeResponseStatus(projectId, taskId);

  // Extract unique user IDs from responses for profile batch-load
  const userIds = useMemo(() => {
    return Array.from(new Set(displayedResponses.map((r) => r.user_id)));
  }, [displayedResponses]);

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

  function finishTask() {
    updateTaskMutation.mutate({
      label: data.label,
      short_description: data.short_description ?? "",
      description: data.description ?? "",
      status: TaskStatusEnum.FINISHED,
    });
  }

  return (
    <div className={`pagecontainer ${styles.container}`}>
      <div className={styles.taskContainer}>
        <div className={`${styles.card} ${styles.cardPadding}`}>

          {/* ── Inline edit form ── */}
          {isAdmin && editing ? (
            <div className={styles.editForm ?? "basic-flex-column"}>
              <input
                className={styles.editInput ?? ""}
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                placeholder="Название задачи"
              />
              <input
                className={styles.editInput ?? ""}
                value={editShortDesc}
                onChange={(e) => setEditShortDesc(e.target.value)}
                placeholder="Краткое описание"
              />
              <textarea
                className={styles.editTextarea ?? ""}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Описание задачи"
                rows={5}
              />
              <div className="basic-flex" style={{ gap: "8px", marginTop: "8px" }}>
                <GreenButton
                  text={updateTaskMutation.isPending ? "Сохранение…" : "Сохранить"}
                  onClick={saveEdit}
                  disabled={!editLabel.trim() || updateTaskMutation.isPending}
                />
                <button onClick={() => setEditing(false)}>Отмена</button>
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
                        onClick={finishTask}
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

      {/* Show response form only for active tasks (non-admin can submit) */}
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
            <ResponseCard
              className={styles.cardPadding}
              {...value}
              username={
                profiles[value.user_id]?.username ??
                value.user_name ??
                "Загрузка..."
              }
              key={value.id ?? index}
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
          ))}
        </div>
      )}
    </div>
  );
}
