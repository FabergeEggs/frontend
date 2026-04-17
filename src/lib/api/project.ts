import { ApiRoutes } from "./constants";
import axiosInstance from "./project_instance";

export const createProject = async (request: ProjectCreateDTO) => {
  const { data } = await axiosInstance.post(ApiRoutes.PROJECT, request);
  return data;
};

export const getProjectInfo = async (id: string) => {
  const { data } = await axiosInstance.get(`${ApiRoutes.PROJECT}/${id}/info`);
  console.log("INFO: ", data )
  return data;
};

export const getProjectStatistics = async (id: string) => {
  const { data } = await axiosInstance.get(`${ApiRoutes.PROJECT}/${id}/statistics`);
  console.log("STATS: ", data)
  return data;
};


export const getProject = async (id: string) => {
  const info = await getProjectInfo(id);
  const statistics = await getProjectStatistics(id);
  return {...info, ...statistics};
};
