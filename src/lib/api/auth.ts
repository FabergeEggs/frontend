import { api } from './instances/base';
import { ApiRoutes } from './constants';
import { setAccessToken, clearAccessToken } from './tokenStore';

export const login = async (request: LoginRequestDTO) => {
  const { data } = await api.post(ApiRoutes.AUTH.LOGIN, request);
  if (data.access_token) {
    setAccessToken(data.access_token);
  }
  return data;
};

export const register = async (request: RegisterRequestDTO) => {
  const { data } = await api.post(ApiRoutes.AUTH.REGISTER, request);
  return data;
};

export const refreshToken = async () => {
  const { data } = await api.post(ApiRoutes.AUTH.REFRESH);
  if (data.access_token) {
    setAccessToken(data.access_token);
  }
  return data;
};

export const logout = async () => {
  try {
    await api.post(ApiRoutes.AUTH.LOGOUT);
  } finally {
    clearAccessToken();
  }
};

export const logoutAll = async () => {
  try {
    await api.post(ApiRoutes.AUTH.LOGOUT_ALL);
  } finally {
    clearAccessToken();
  }
};

export const verifyEmail = async (key: string) => {
  const { data } = await api.post(ApiRoutes.AUTH.VERIFY_EMAIL, { key });
  return data;
};

export const emailResendVerification = async (email: string) => {
  const { data } = await api.post(ApiRoutes.AUTH.EMAIL_RESEND_VERIFICATION, { email });
  return data;
};

export const forgotPassword = async (email: string) => {
  const { data } = await api.post(ApiRoutes.AUTH.FORGOT_PASSWORD, { email });
  return data;
};

export const resetPassword = async (key: string, new_password: string) => {
  const { data } = await api.post(ApiRoutes.AUTH.RESET_PASSWORD, {
    key,
    new_password,
  });
  return data;
};

export const changePassword = async (old_password: string, new_password: string) => {
  const { data } = await api.post(ApiRoutes.AUTH.CHANGE_PASSWORD, {
    old_password,
    new_password,
  });
  return data;
};