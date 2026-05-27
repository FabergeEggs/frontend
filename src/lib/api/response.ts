import { api } from "./instances/base";
import { ApiRoutes } from "./constants";
import type { ResponseStatus } from "@/src/lib/models/export/response";

// ──── Create Comments & Responses ────
export const createPostComment = async (
  projectId: string,
  postId: string,
  content: string,
) => {
  const { data } = await api.post(
    ApiRoutes.PROJECT.GET_POST_COMMENTS(projectId, postId),
    { content },
  );
  return data;
};

export const createTaskResponse = async (
  projectId: string,
  taskId: string,
  text: string,
  attached_files?: string[],
) => {
  const { data } = await api.post(
    ApiRoutes.PROJECT.GET_TASK_RESPONSES(projectId, taskId),
    { text, attached_files: attached_files || [] },
  );
  return data;
};

export const changeResponseStatus = async (
  projectId: string,
  taskId: string,
  responseId: string,
  status: ResponseStatus,
) => {
  const { data } = await api.patch(
    ApiRoutes.PROJECT.CHANGE_RESPONSE_STATUS(projectId, taskId, responseId),
    { status },
  );
  return data;
};
