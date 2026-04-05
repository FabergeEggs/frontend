import { ApiRoutes } from "./constants";
import axiosInstance from "./instance";

export const getProfile = async (id: string) => {
  const { data } = await axiosInstance.get(`${ApiRoutes.PROFILE}/${id}`);
  return data;
};

export const getProfiles = async (skip: number = 0, limit: number = 10) => {
  const { data } = await axiosInstance.get(`${ApiRoutes.PROFILE}/?skip=${skip}&limit=${limit}`);
  return data;
};

// export const updateProfile = async()