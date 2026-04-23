import { ApiRoutes } from "./constants";
import axiosInstance from "./instances/auth_instance";
import { setAccessToken, clearAccessToken } from "./tokenStore";

export const login = async (request: LoginRequestDTO) => {
  const { data } = await axiosInstance.post(ApiRoutes.LOGIN, request);
  if (data.access_token) {
    setAccessToken(data.access_token);
  }
  return data;
};

export const refreshToken = async () => {
  const { data } = await axiosInstance.post(ApiRoutes.REFRESH_TOKEN);
  if (data.access_token) {
    setAccessToken(data.access_token);
  }
  return data;
};

export const logout = async () => {
  await axiosInstance.post(ApiRoutes.LOGOUT);
  clearAccessToken();
};

export const register = async (request: RegisterRequestDTO) => {
  const { data } = await axiosInstance.post(ApiRoutes.REGISTER, request);
  return data;
};

export const verifyEmail = async (key: string) => {
  const { data } = await axiosInstance.post(ApiRoutes.VERIFY_EMAIL, { key });
  return data;
};

export const emailResendVerification = async (email: string) => {
  const { data } = await axiosInstance.post(
    ApiRoutes.EMAIL_RESEND_VERIFICATION,
    { email },
  );
  return data;
};

export const forgotPassword = async (email: string) => {
  const { data } = await axiosInstance.post(ApiRoutes.FORGOT_PASSWORD, {
    "email": email,
  });
  return data;
};


// Key from email
export const resetPassword = async (key: string, new_password: string) => {
  console.log(`RESETTING PASS, key: ${key}\nPASS: ${new_password}`);
  const { data } = await axiosInstance.post(ApiRoutes.RESET_PASSWORD, {
    key: key,
    new_password: new_password,
  });
  return data;
};


// <!>
export const changePassword = async (old_password: string, new_password: string) => {
  const { data } = await axiosInstance.post(ApiRoutes.CHANGE_PASSWORD, {
    old_password: old_password,
    new_password: new_password,
  });
  return data;
};
