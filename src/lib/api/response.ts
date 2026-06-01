import { api } from "./instances/base";
import { ApiRoutes } from "./constants";
import type {
  CommentDTO,
  ResponseStatus,
} from "@/src/lib/models/export/response";

// Comments
export const getPostComments = async (
  _projectId: string,
  postId: string,
): Promise<CommentDTO[]> => {
  const { data } = await api.get(
    ApiRoutes.PROJECT.GET_POST_COMMENTS(_projectId, postId),
  );
  return data;
};

export const createPostComment = async (
  _projectId: string,
  postId: string,
  content: string,
) => {
  const { data } = await api.post(
    ApiRoutes.PROJECT.CREATE_POST_COMMENT(_projectId, postId),
    { text: content },
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
