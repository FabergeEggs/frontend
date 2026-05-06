import { api } from './instances/base';
import { ApiRoutes } from './constants';

// ──── Project CRUD ────
export const createProject = async (request: ProjectCreateDTO) => {
  const { data } = await api.post(ApiRoutes.PROJECT.CREATE, request);
  return data;
};

export const updateProject = async (projectId: string, request: ProjectCreateDTO) => {
  const { data } = await api.put(ApiRoutes.PROJECT.UPDATE(projectId), request);
  return data;
};

export const getProjectInfo = async (id: string): Promise<ProjectInfoDTO> => {
  const { data } = await api.get(ApiRoutes.PROJECT.GET_INFO(id));
  return data;
};

export const getProjectStatistics = async (id: string): Promise<ProjectStatsDTO> => {
  const { data } = await api.get(ApiRoutes.PROJECT.GET_STATS(id));
  return data;
};

export const getProject = async (id: string): Promise<ProjectFull> => {
  const info = await getProjectInfo(id)
  const stats = await getProjectStatistics(id)
  return { ...info, ...stats };
};

export const getProjectsBatch = async (projectIds: string[]) => {
  const { data } = await api.post(ApiRoutes.PROJECT.BATCH, projectIds);
  return data;
};

// ──── Tasks ────
export const createTask = async (projectId: string, request: TaskCreateDTO) => {
  const { data } = await api.post(ApiRoutes.PROJECT.CREATE_TASK(projectId), request);
  return data;
};

export const getTask = async (projectId: string, taskId: string) => {
  const { data } = await api.get(ApiRoutes.PROJECT.GET_TASK(projectId, taskId));
  return data;
};

export const updateTask = async (projectId: string, taskId: string, request: TaskUpdateDTO) => {
  const { data } = await api.put(ApiRoutes.PROJECT.UPDATE_TASK(projectId, taskId), request);
  return data;
};

// ──── Posts ────
export const createPost = async (projectId: string, request: PostCreateDTO) => {
  const { data } = await api.post(ApiRoutes.PROJECT.CREATE_POST(projectId), request);
  return data;
};

export const getPost = async (projectId: string, postId: string): Promise<Post> => {
  const { data } = await api.get(ApiRoutes.PROJECT.GET_POST(projectId, postId));
  return data;
};

export const updatePost = async (projectId: string, postId: string, request: PostUpdateDTO) => {
  const { data } = await api.put(ApiRoutes.PROJECT.UPDATE_POST(projectId, postId), request);
  return data;
};

export const deletePost = async (projectId: string, postId: string) => {
  const { data } = await api.delete(ApiRoutes.PROJECT.DELETE_POST(projectId, postId));
  return data;
};

// ──── Members ────
export const addMember = async (projectId: string, userId: string) => {
  const { data } = await api.post(ApiRoutes.PROJECT.ADD_MEMBER(projectId), { id: userId });
  return data;
};

export const removeMember = async (projectId: string, userId: string) => {
  const { data } = await api.delete(ApiRoutes.PROJECT.REMOVE_MEMBER(projectId, userId));
  return data;
};

// ──── Publications & Memberships ────
export const getPublications = async (
  projectId: string,
  limit: number = 20,
  cursor?: string
): Promise<PublicationsResponse> => {
  const params = new URLSearchParams({ limit: limit.toString() });
  if (cursor) params.append('cursor', cursor);

  const { data } = await api.get(
    `${ApiRoutes.PROJECT.GET_PUBLICATIONS(projectId)}?${params}`
  );
  return data;
};

export const getUserMemberships = async (profileId: string) => {
  const { data } = await api.get(ApiRoutes.PROJECT.GET_MEMBERSHIPS(profileId));
  return data;
};

// ──── Health ────
export const projectHealthCheck = async () => {
  const { data } = await api.get(ApiRoutes.PROJECT.HEALTH);
  return data;
};