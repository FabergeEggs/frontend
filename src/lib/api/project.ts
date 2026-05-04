import { ApiRoutes } from "./constants";
import axiosInstance from "./instances/project_instance";

// Project CRU

export const createProject = async (request: ProjectCreateDTO) => {
  const { data } = await axiosInstance.post(ApiRoutes.PROJECT, request);
  return data;
};

export const updateProject = async (project_id: string, request: ProjectCreateDTO) => {
  const { data } = await axiosInstance.put(`${ApiRoutes.PROJECT}/${project_id}`, request);
  return data;
};

export const getProjectInfo = async (id: string): Promise<ProjectInfoDTO> => {
  const { data } = await axiosInstance.get(`${ApiRoutes.PROJECT}/${id}/info`);
  return data;
};

export const getProjectStatistics = async (id: string): Promise<ProjectStatsDTO> => {
  const { data } = await axiosInstance.get(
    `${ApiRoutes.PROJECT}/${id}/statistics`,
  );
  return data;
};

export const getProject = async (id: string): Promise<ProjectFull> => {
  const info = await getProjectInfo(id);
  const statistics = await getProjectStatistics(id);
  return { ...info, ...statistics};
};


// Memberships

export const getUserMemberships = async (profile_id: string): Promise<MembershipsDTO> => {
  const { data } = await axiosInstance.get(`${ApiRoutes.PROFILE}/profile/${profile_id}`);
  return data;
}

export const addMember = async (project_id: string, request: AddMemberDTO) => {
  const { data } = await axiosInstance.post(`${ApiRoutes.PROJECT}/${project_id}/member`, request);
  return data;
}

export const removeMember = async (project_id: string, user_id: string) => {
  const { data } = await axiosInstance.delete(`${ApiRoutes.PROJECT}/${project_id}/member/${user_id}`);
  return data;
}

// Publications (Posts and Tasks)

export const getPublications = async (project_id: string): Promise<(Task | Post)[]> => {
  const { data } = await axiosInstance.get(`${ApiRoutes.PROJECT}/${project_id}/publications`);
  return data;
}



// Task CRUD

export const createTask = async (project_id: string, request: TaskCreateDTO) => {
  const { data } = await axiosInstance.post(`${ApiRoutes.PROJECT}/${project_id}/task`, request);
  return data;
};

export const getTask = async (project_id: string, task_id: string): Promise<Task> => {
  const { data } = await axiosInstance.get(`${ApiRoutes.PROJECT}/${project_id}/task/${task_id}`);
  return data;
};

export const updateTask = async (project_id: string, task_id: string, request: TaskUpdateDTO) => {
  const { data } = await axiosInstance.put(`${ApiRoutes.PROJECT}/${project_id}/task/${task_id}`, request);
  return data;
};


// Post CRUD

export const createPost = async (project_id: string, request: PostCreateDTO) => {
  const { data } = await axiosInstance.post(`${ApiRoutes.PROJECT}/${project_id}/post`, request);
  return data;
};

export const getPost = async (project_id: string, post_id: string): Promise<Post> => {
  const { data } = await axiosInstance.get(`${ApiRoutes.PROJECT}/${project_id}/post/${post_id}`);
  return data;
};

export const updatePost = async (project_id: string, post_id: string, request: PostCreateDTO) => {
  const { data } = await axiosInstance.put(`${ApiRoutes.PROJECT}/${project_id}/post/${post_id}`, request);
  return data;
};

export const deletePost = async (project_id: string, post_id: string) => {
  const { data } = await axiosInstance.delete(`${ApiRoutes.PROJECT}/${project_id}/post/${post_id}`);
  return data;
};