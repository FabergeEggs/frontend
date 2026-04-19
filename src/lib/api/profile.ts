import { ApiRoutes } from "./constants";
import axiosInstance from "./instances/profile_instance";

export const getProfile = async (id: string): Promise<ProfileDTO> => {
  const { data } = await axiosInstance.get(`${ApiRoutes.PROFILE}/${id}`);
  return data;
};

export const updateProfile = async (id: string, request: UpdateProfileRequestDTO): Promise<ProfileDTO> => {
  const { data } = await axiosInstance.put(`${ApiRoutes.PROFILE}/${id}`, request );
  console.log("PROFILE UPDATE DATA:", data); // DEBUG
  return data;
};

export const getProfiles = async (skip: number = 0, limit: number = 10) => {
  const { data } = await axiosInstance.get(`${ApiRoutes.PROFILE}/?skip=${skip}&limit=${limit}`);
  return data;
};

// export const updateProfile = async()