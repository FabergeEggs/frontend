"use client";

import { useTask, useTaskResponses } from "@/src/lib/query/project";
import { useAuth } from "@/src/lib/providers/AuthProvider";
import { useChangeResponseStatus } from "@/src/lib/query/response";
import { ResponseStatus } from "@/src/lib/models/export/response";
import { TaskStatusEnum } from "@/src/lib/models/export/project";
import { useProfiles } from "@/src/lib/query/profile";
import { useMemo } from "react";

import ResponseForm from "@/src/ui/forms/ResponseForm/ResponseForm";
import ResponseCard from "@/src/ui/info/ResponseCard/ResponseCard";
import ValidationError from "@/src/ui/forms/ValidationError/ValidationError";

import styles from "../projectpage.module.css";

export default function ReportPageClient({
  projectId,
  taskId,
}: {
  projectId: string;
  taskId: string;
}) {
  const { userId } = useAuth();
  const taskQuery = useTask(projectId, taskId);
  const responsesQuery = useTaskResponses(projectId, taskId);
  const changeStatusMutation = useChangeResponseStatus(projectId, taskId);

  const responses = responsesQuery.data ?? [];
  const userIds = useMemo(
    () => Array.from(new Set(responses.map((r) => r.user_id))),
    [responses],
  );
  const profilesQuery = useProfiles(userIds);
  const profiles = profilesQuery.data ?? {};

  if (taskQuery.isLoading) {
    return <div className="centered">Загрузка…</div>;
  }

  if (taskQuery.isError || !taskQuery.data) {
    return (
      <div className="centered">
        <ValidationError messages={["Не удалось загрузить задачу"]} />
      </div>
    );
  }

  const task = taskQuery.data;
  const isAdmin = userId === task.creator_id;

  return (
    <div className="pagecontainer basic-flex-column">
      {/* Task summary */}
      <div className="basic-card" style={{ padding: "24px" }}>
        <h1>{task.label}</h1>
        <p style={{ color: "var(--secondary-text-color)", marginTop: "8px" }}>
          {task.description}
        </p>
        <p style={{ marginTop: "8px", fontSize: "0.9em" }}>
          Статус:{" "}
          <strong>
            {task.status === TaskStatusEnum.ACTIVE && "Активен"}
            {task.status === TaskStatusEnum.FINISHED && "Завершён"}
            {task.status === TaskStatusEnum.DELETED && "Удалён"}
          </strong>
        </p>
      </div>

      {/* Submission form — only for active tasks and non-admin */}
      {task.status === TaskStatusEnum.ACTIVE && !isAdmin && (
        <ResponseForm
          className=""
          placeholder="Опишите выполненную работу, прикрепите результаты…"
          projectId={projectId}
          taskId={taskId}
        />
      )}

      {/* Admin: manage all responses */}
      {responses.length > 0 && (
        <div className="basic-flex-column" style={{ gap: "12px" }}>
          <h2>Отклики ({responses.length})</h2>
          {responses.map((r, idx) => (
            <ResponseCard
              key={r.id ?? idx}
              className=""
              {...r}
              username={
                profiles[r.user_id]?.username ?? r.user_name ?? "Загрузка..."
              }
              isAdmin={isAdmin}
              onApprove={() =>
                changeStatusMutation.mutate({
                  responseId: r.id,
                  status: ResponseStatus.ACCEPTED,
                })
              }
              onReject={() =>
                changeStatusMutation.mutate({
                  responseId: r.id,
                  status: ResponseStatus.REJECTED,
                })
              }
            />
          ))}
        </div>
      )}

      {responses.length === 0 && !responsesQuery.isLoading && (
        <p style={{ color: "var(--secondary-text-color)" }}>
          Откликов пока нет.
        </p>
      )}
    </div>
  );
}
