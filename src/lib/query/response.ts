"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addAttachedFile,
  addComment,
  changeResponseStatus,
  createResponse,
  deleteComment,
  deleteResponse,
  getResponseComments,
  getTaskResponses,
} from "@/src/lib/api/response";
import type { ResponseStatus } from "@/src/lib/models/export/response";
import { projectKeys, responseKeys } from "./keys";

export function useTaskResponses(taskId: string) {
  return useQuery({
    queryKey: responseKeys.taskResponses(taskId),
    queryFn: () => getTaskResponses(taskId),
    enabled: Boolean(taskId),
  });
}

export function useResponseComments(responseId: string) {
  return useQuery({
    queryKey: responseKeys.comments(responseId),
    queryFn: () => getResponseComments(responseId),
    enabled: Boolean(responseId),
  });
}

export function useCreatePostComment(projectId: string, postId: string, userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => addComment(postId, { user_id: userId, text: content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: responseKeys.comments(postId),
      });
      queryClient.invalidateQueries({
        queryKey: responseKeys.postComments(projectId, postId),
      });
    },
  });
}

export function useDeletePostComment(projectId: string, postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: responseKeys.comments(postId),
      });
      queryClient.invalidateQueries({
        queryKey: responseKeys.postComments(projectId, postId),
      });
    },
  });
}

export function useCreateTaskResponse(projectId: string, taskId: string, userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { text: string; files?: File[] }) => {
      const created = await createResponse({
        task_id: taskId,
        user_id: userId,
        text: data.text,
      });

      if (data.files?.length) {
        const uploaded = await Promise.all(
          data.files.map((file) => addAttachedFile(created.id, file)),
        );

        return { ...created, attached_files: uploaded };
      }

      return created;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: responseKeys.taskResponses(taskId),
      });
      queryClient.invalidateQueries({
        queryKey: responseKeys.taskResponsesByProject(projectId, taskId),
      });
      queryClient.invalidateQueries({
        queryKey: projectKeys.task(projectId, taskId),
      });
    },
  });
}

export function useDeleteTaskResponse(projectId: string, taskId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (responseId: string) => deleteResponse(responseId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: responseKeys.taskResponses(taskId),
      });
      queryClient.invalidateQueries({
        queryKey: responseKeys.taskResponsesByProject(projectId, taskId),
      });
    },
  });
}

export function useChangeTaskResponseStatus(projectId: string, taskId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ responseId, status }: { responseId: string; status: ResponseStatus }) =>
      changeResponseStatus(responseId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: responseKeys.taskResponses(taskId),
      });
      queryClient.invalidateQueries({
        queryKey: responseKeys.taskResponsesByProject(projectId, taskId),
      });
    },
  });
}