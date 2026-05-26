import { api } from "./instances/base";
import { ApiRoutes } from "./constants";

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
