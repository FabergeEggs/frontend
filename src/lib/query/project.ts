"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  type QueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  createProject,
  updateProject,
  getProject,
  getProjectInfo,
  getProjectStatistics,
  getPublications,
  getUserMemberships,
  createTask,
  updateTask,
  createPost,
  deletePost as deletePostApi,
  getTask,
  getPost,
  projectHealthCheck,
  getPostComments,
  getTaskResponses,
  addMember,
} from "@/src/lib/api/project";
import { projectKeys, responseKeys } from "./keys";
import { getApiErrorMessage } from "@/src/lib/api/errors";
import type {
  ProjectCreateDTO,
  ProjectUpdateDTO,
  ProjectFull,
  TaskCreateDTO,
  TaskUpdateDTO,
  PostCreateDTO,
  DenormUserDTO,
} from "@/src/lib/models/export/project";
import { ProjectRoleEnum } from "@/src/lib/models/export/project";

export function useProject(
  projectId: string,
  options?: Omit<UseQueryOptions<ProjectFull>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: projectKeys.detail(projectId),
    queryFn: () => getProject(projectId),
    enabled: Boolean(projectId),
    ...options,
  });
}

export function useProjectInfo(projectId: string) {
  return useQuery({
    queryKey: projectKeys.info(projectId),
    queryFn: () => getProjectInfo(projectId),
    enabled: Boolean(projectId),
  });
}

export function useProjectStatistics(projectId: string) {
  return useQuery({
    queryKey: projectKeys.stats(projectId),
    queryFn: () => getProjectStatistics(projectId),
    enabled: Boolean(projectId),
  });
}

export function usePublications(projectId: string, limit = 20) {
  return useQuery({
    queryKey: projectKeys.publications(projectId, limit),
    queryFn: () => getPublications(projectId, limit),
    enabled: Boolean(projectId),
  });
}

export function useInfinitePublications(projectId: string, limit = 20) {
  return useInfiniteQuery({
    queryKey: [...projectKeys.publications(projectId, limit), "infinite"] as const,
    queryFn: ({ pageParam }) =>
      getPublications(projectId, limit, pageParam as string | undefined),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.has_more ? (lastPage.next_cursor ?? undefined) : undefined,
    enabled: Boolean(projectId),
  });
}

export function useUserMemberships(profileId: string) {
  return useQuery({
    queryKey: projectKeys.memberships(profileId),
    queryFn: () => getUserMemberships(profileId),
    enabled: Boolean(profileId),
  });
}

export function useTask(projectId: string, taskId: string) {
  return useQuery({
    queryKey: projectKeys.task(projectId, taskId),
    queryFn: () => getTask(projectId, taskId),
    enabled: Boolean(projectId && taskId),
  });
}

export function usePost(projectId: string, postId: string) {
  return useQuery({
    queryKey: projectKeys.post(projectId, postId),
    queryFn: () => getPost(projectId, postId),
    enabled: Boolean(projectId && postId),
  });
}

export function useProjectHealth() {
  return useQuery({
    queryKey: projectKeys.health(),
    queryFn: projectHealthCheck,
    staleTime: 30 * 1000,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProjectCreateDTO) => createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
}

export function useUpdateProject(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProjectUpdateDTO) => updateProject(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(projectId) });
      queryClient.invalidateQueries({ queryKey: projectKeys.info(projectId) });
    },
  });
}

function invalidateProjectPublications(
  queryClient: QueryClient,
  projectId: string,
) {
  return queryClient.invalidateQueries({
    queryKey: projectKeys.publicationsRoot(projectId),
    refetchType: "active",
  });
}

export function useCreateTask(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TaskCreateDTO) => createTask(projectId, data),
    onSuccess: async () => {
      await invalidateProjectPublications(queryClient, projectId);
      await queryClient.invalidateQueries({
        queryKey: projectKeys.stats(projectId),
        refetchType: "active",
      });
      await queryClient.invalidateQueries({
        queryKey: projectKeys.detail(projectId),
        refetchType: "active",
      });
    },
  });
}

export function useCreatePost(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostCreateDTO) => createPost(projectId, data),
    onSuccess: () => invalidateProjectPublications(queryClient, projectId),
  });
}

export function useDeletePost(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => deletePostApi(projectId, postId),
    onSuccess: () => invalidateProjectPublications(queryClient, projectId),
  });
}

export function usePostComments(projectId: string, postId: string) {
  return useQuery({
    queryKey: responseKeys.postComments(projectId, postId),
    queryFn: () => getPostComments(projectId, postId),
    enabled: Boolean(projectId && postId),
  });
}

export function useTaskResponses(projectId: string, taskId: string) {
  return useQuery({
    queryKey: responseKeys.taskResponses(projectId, taskId),
    queryFn: () => getTaskResponses(projectId, taskId),
    enabled: Boolean(projectId && taskId),
  });
}

export function useUpdateTask(projectId: string, taskId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TaskUpdateDTO) => updateTask(projectId, taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.task(projectId, taskId) });
    },
  });
}

export function useAddMember(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) =>
      addMember(projectId, { id: userId, role: ProjectRoleEnum.VOLUNTEER } as DenormUserDTO),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(projectId) });
    },
  });
}

/** Сообщение об ошибке из query/mutation для UI */
export { getApiErrorMessage };
