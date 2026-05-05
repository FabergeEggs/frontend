import { ApiRoutes } from "./constants";
import { api } from "./instances/base";

export const getProfile = async (id: string): Promise<ProfileDTO> => {
  const { data } = await api.get(`${ApiRoutes.PROFILE}/${id}`);
  return data;
};

export const updateProfile = async (id: string, request: UpdateProfileRequestDTO): Promise<ProfileDTO> => {
  const { data } = await api.put(`${ApiRoutes.PROFILE}/${id}`, request );
  return data;
};

export const getProfiles = async (skip: number = 0, limit: number = 10) => {
  const { data } = await api.get(`${ApiRoutes.PROFILE}/?skip=${skip}&limit=${limit}`);
  return data;
};
