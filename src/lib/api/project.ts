import { ApiRoutes } from "./constants";
import axiosInstance from "./instances/project_instance";

export const createProject = async (request: ProjectCreateDTO) => {
  const { data } = await axiosInstance.post(ApiRoutes.PROJECT, request);
  return data;
};

export const updateProject = async (request: ProjectUpdateDTO) => {
  const { data } = await axiosInstance.put(ApiRoutes.PROJECT, request);
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

export const getProjectDetail = async (id: string): Promise<ProjectDetailDTO> => {
  const { data } = await axiosInstance.get(`${ApiRoutes.PROJECT}/${id}/detail`);
  return data;
};

export const getProject = async (id: string): Promise<ProjectFull> => {
  const info = await getProjectInfo(id);
  const statistics = await getProjectStatistics(id);
  const detail = await getProjectDetail(id)
  return { ...info, ...statistics, ...detail };
};



export const createTask = async (request: TaskCreateDTO) => {
  const { data } = await axiosInstance.post(ApiRoutes.PROJECT, request);
  return data;
};

export const createPost = async (request: PostCreateDTO) => {
  const { data } = await axiosInstance.post(ApiRoutes.PROJECT, request);
  return data;
};