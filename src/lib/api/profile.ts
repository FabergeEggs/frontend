import { api } from "./instances/base";
import { ApiRoutes } from "./constants";
import { setUsername } from "../store/userStore";

export const getProfile = async (id: string): Promise<ProfileDTO> => {
  const { data } = await api.get(ApiRoutes.PROFILE.GET(id));
  if (data.username) {
    setUsername(data.username);
  }
  return data;
};

export const updateProfile = async (
  id: string,
  request: UpdateProfileRequestDTO,
): Promise<ProfileDTO> => {
  const { data } = await api.put(ApiRoutes.PROFILE.UPDATE(id), request);
  return data;
};

export const deleteProfile = async (id: string): Promise<void> => {
  await api.delete(ApiRoutes.PROFILE.DELETE(id));
};
