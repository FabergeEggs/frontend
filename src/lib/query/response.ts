"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  type QueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { createPostComment, createTaskResponse, changeResponseStatus } from "../api/response"
import { responseKeys } from "./keys";
import type { ResponseStatus } from "@/src/lib/models/export/response";

export function useCreatePostComment(projectId: string, postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      createPostComment(projectId, postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: responseKeys.postComments(projectId, postId),
      });
    },
  });
}

export function useCreateTaskResponse(projectId: string, taskId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { text: string; attached_files?: string[] }) =>
      createTaskResponse(projectId, taskId, data.text, data.attached_files),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: responseKeys.taskResponses(projectId, taskId),
      });
    },
  });
}

export function useChangeResponseStatus(projectId: string, taskId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ responseId, status }: { responseId: string; status: ResponseStatus }) =>
      changeResponseStatus(projectId, taskId, responseId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: responseKeys.taskResponses(projectId, taskId),
      });
    },
  });
}