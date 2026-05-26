import { api } from "./instances/base";
import type {
  ResponseDTO,
  CreateResponseRequest,
  UpdateResponseRequest,
  CommentDTO,
  CreateCommentRequest,
  ChangeStatusRequest,
} from "@/src/lib/models/export/response";

// ─── Responses ───────────────────────────────────────────────────────────────

/**
 * GET /response/responses?task_id={task_id}
 * Get all responses for a task
 */
export const getTaskResponses = async (
  task_id: string,
): Promise<ResponseDTO[]> => {
  const { data } = await api.get("/response/responses", {
    params: { task_id },
  });
  return data;
};

/**
 * POST /response/responses
 * Create a new response to a task
 */
export const createResponse = async (
  request: CreateResponseRequest,
): Promise<ResponseDTO> => {
  const { data } = await api.post("/response/responses", request);
  return data;
};

/**
 * GET /response/responses/{response_id}
 * Get a single response
 */
export const getResponse = async (response_id: string): Promise<ResponseDTO> => {
  const { data } = await api.get(`/response/responses/${response_id}`);
  return data;
};

/**
 * PUT /response/responses/{response_id}
 * Update a response
 */
export const updateResponse = async (
  response_id: string,
  request: UpdateResponseRequest,
): Promise<ResponseDTO> => {
  const { data } = await api.put(
    `/response/responses/${response_id}`,
    request,
  );
  return data;
};

/**
 * DELETE /response/responses/{response_id}
 * Delete a response
 */
export const deleteResponse = async (response_id: string): Promise<void> => {
  await api.delete(`/response/responses/${response_id}`);
};

/**
 * PATCH /response/responses/{response_id}/status
 * Change response status (accept/reject/cancel)
 */
export const changeResponseStatus = async (
  response_id: string,
  request: ChangeStatusRequest,
): Promise<ResponseDTO> => {
  const { data } = await api.patch(
    `/response/responses/${response_id}/status`,
    request,
  );
  return data;
};

// ─── Comments ────────────────────────────────────────────────────────────────

/**
 * GET /response/responses/{response_id}/comments
 * Get all comments for a response
 */
export const getResponseComments = async (
  response_id: string,
): Promise<CommentDTO[]> => {
  const { data } = await api.get(
    `/response/responses/${response_id}/comments`,
  );
  return data;
};

/**
 * POST /response/responses/{response_id}/comments
 * Add a comment to a response
 */
export const addComment = async (
  response_id: string,
  request: CreateCommentRequest,
): Promise<CommentDTO> => {
  const { data } = await api.post(
    `/response/responses/${response_id}/comments`,
    request,
  );
  return data;
};

/**
 * GET /response/comments/{comment_id}
 * Get a single comment
 */
export const getComment = async (comment_id: string): Promise<CommentDTO> => {
  const { data } = await api.get(`/response/comments/${comment_id}`);
  return data;
};

/**
 * DELETE /response/comments/{comment_id}
 * Delete a comment
 */
export const deleteComment = async (comment_id: string): Promise<void> => {
  await api.delete(`/response/comments/${comment_id}`);
};

// ─── Attached Files ──────────────────────────────────────────────────────────

/**
 * POST /response/responses/{response_id}/files
 * Attach a file to a response (multipart/form-data)
 */
export const addAttachedFile = async (
  response_id: string,
  file: File,
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post(
    `/response/responses/${response_id}/files`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data; // returns file UUID
};

/**
 * GET /response/responses/{response_id}/files/{file_id}
 * Get an attached file
 */
export const getAttachedFile = async (
  response_id: string,
  file_id: string,
): Promise<Blob> => {
  const { data } = await api.get(
    `/response/responses/${response_id}/files/${file_id}`,
    {
      responseType: "blob",
    },
  );
  return data;
};

/**
 * DELETE /response/responses/{response_id}/files/{file_id}
 * Delete an attached file
 */
export const deleteAttachedFile = async (
  response_id: string,
  file_id: string,
): Promise<void> => {
  await api.delete(`/response/responses/${response_id}/files/${file_id}`);
};
