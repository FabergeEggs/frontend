import projectApi from "./instances/project_instance";
import { ApiRoutes } from "./constants";
import type {
  ProjectCreateDTO,
  ProjectUpdateDTO,
  ProjectInfoDTO,
  ProjectStatsDTO,
  ProjectFull,
  ProjectDTO,
  TaskCreateDTO,
  TaskUpdateDTO,
  Task,
  PostCreateDTO,
  PostUpdateDTO,
  Post,
  PublicationsResponse,
  MembershipsDTO,
  DenormUserDTO,
} from "@/src/lib/models/export/project";
import type { ResponseDTO } from "@/src/lib/models/export/response";

// ──── Project CRUD ────
export const createProject = async (request: ProjectCreateDTO) => {
  const { data } = await projectApi.post(ApiRoutes.PROJECT.CREATE, request);
  return data as { id: string; message?: string };
};

export const updateProject = async (
  projectId: string,
  request: ProjectUpdateDTO,
) => {
  const { data } = await projectApi.put(
    ApiRoutes.PROJECT.UPDATE(projectId),
    request,
  );
  return data;
};

export const getProjectInfo = async (id: string): Promise<ProjectInfoDTO> => {
  const { data } = await projectApi.get(ApiRoutes.PROJECT.GET_INFO(id));
  return data;
};

export const getProjectStatistics = async (
  id: string,
): Promise<ProjectStatsDTO> => {
  const { data } = await projectApi.get(ApiRoutes.PROJECT.GET_STATS(id));
  return data;
};

export const getProject = async (id: string): Promise<ProjectFull> => {
  const [info, stats] = await Promise.all([
    getProjectInfo(id),
    getProjectStatistics(id),
  ]);
  return { ...info, ...stats };
};

export const getProjectsBatch = async (
  projectIds: string[],
): Promise<ProjectDTO[]> => {
  const { data } = await projectApi.post(ApiRoutes.PROJECT.BATCH, projectIds);
  return data;
};

// ──── Tasks ────
export const createTask = async (projectId: string, request: TaskCreateDTO) => {
  const { data } = await projectApi.post(
    ApiRoutes.PROJECT.CREATE_TASK(projectId),
    request,
  );
  return data as { id?: string; task_id?: string; message?: string };
};

export const getTask = async (
  projectId: string,
  taskId: string,
): Promise<Task> => {
  const { data } = await projectApi.get(
    ApiRoutes.PROJECT.GET_TASK(projectId, taskId),
  );
  return data;
};

export const updateTask = async (
  projectId: string,
  taskId: string,
  request: TaskUpdateDTO,
) => {
  const { data } = await projectApi.put(
    ApiRoutes.PROJECT.UPDATE_TASK(projectId, taskId),
    request,
  );
  return data;
};

// ──── Posts ────
export const createPost = async (projectId: string, request: PostCreateDTO) => {
  const { data } = await projectApi.post(
    ApiRoutes.PROJECT.CREATE_POST(projectId),
    request,
  );
  return data as { id?: string; post_id?: string; message?: string };
};

export const getPost = async (
  projectId: string,
  postId: string,
): Promise<Post> => {
  const { data } = await projectApi.get(
    ApiRoutes.PROJECT.GET_POST(projectId, postId),
  );
  return data;
};

export const updatePost = async (
  projectId: string,
  postId: string,
  request: PostUpdateDTO,
) => {
  const { data } = await projectApi.put(
    ApiRoutes.PROJECT.UPDATE_POST(projectId, postId),
    request,
  );
  return data;
};

export const deletePost = async (projectId: string, postId: string) => {
  const { data } = await projectApi.delete(
    ApiRoutes.PROJECT.DELETE_POST(projectId, postId),
  );
  return data;
};

// ──── Members ────
export const addMember = async (projectId: string, user: DenormUserDTO) => {
  const { data } = await projectApi.post(
    ApiRoutes.PROJECT.ADD_MEMBER(projectId),
    user,
  );
  return data;
};

export const removeMember = async (projectId: string, userId: string) => {
  const { data } = await projectApi.delete(
    ApiRoutes.PROJECT.REMOVE_MEMBER(projectId, userId),
  );
  return data;
};

// ──── Publications & Memberships ────
export const getPublications = async (
  projectId: string,
  limit = 20,
  cursor?: string,
): Promise<PublicationsResponse> => {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) {
    params.set("cursor", cursor);
  }

  const { data } = await projectApi.get(
    `${ApiRoutes.PROJECT.GET_PUBLICATIONS(projectId)}?${params}`,
  );
  return data;
};

export const getUserMemberships = async (
  profileId: string,
): Promise<MembershipsDTO> => {
  const { data } = await projectApi.get(
    ApiRoutes.PROJECT.GET_MEMBERSHIPS(profileId),
  );
  return data;
};

export const projectHealthCheck = async () => {
  const { data } = await projectApi.get(ApiRoutes.PROJECT.HEALTH);
  return data;
};

// ──── Task responses (proxied to response_service via gateway) ────
export const getTaskResponses = async (
  projectId: string,
  taskId: string,
): Promise<ResponseDTO[]> => {
  const { data } = await projectApi.get(
    ApiRoutes.PROJECT.GET_TASK_RESPONSES(projectId, taskId),
  );
  return data;
};
