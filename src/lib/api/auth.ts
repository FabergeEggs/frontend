import { ApiRoutes } from "./constants";
import axiosInstance from "./auth_instance";

export const login = async (request: LoginRequestDTO) => {
  const { data } = await axiosInstance.post(ApiRoutes.LOGIN, request);
  return data;
};

export const logout = async () => {
  await axiosInstance.post(ApiRoutes.LOGOUT);
};

export const register = async (request: RegisterRequestDTO) => {
  const { data } = await axiosInstance.post(ApiRoutes.REGISTER, request);
  return data;
};

// User id as a param instead of email?
export const emailResendVerification = async (email: string) => {
  const { data } = await axiosInstance.post(
    ApiRoutes.EMAIL_RESEND_VERIFICATION,
    { email },
  );
  return data;
};

export const verifyEmail = async (key: string) => {
  const { data } = await axiosInstance.post(ApiRoutes.VERIFY_EMAIL, { key });
  return data;
};

export const resetPassword = async (email: string) => {
  const { data } = await axiosInstance.post(ApiRoutes.RESET_PASSWORD, {
    email,
  });
  return data;
};

// Change to GET PROFILE
// Session - NEEDS access_token from COOKIE
// export const getCompany = async () => {
//   // .get<GetCompanyResponse>
//   const { data } = await axiosInstance.get(ApiRoutes.GET_COMPANY);
//   // console.log(data);

//   return data;
// };
export const me = async (): Promise<MeResponseDTO> => {
  const { data } = await axiosInstance.get(ApiRoutes.ME);
  return data;
};

export const refreshToken = async () => {
  await axiosInstance.head(ApiRoutes.REFRESH_TOKEN);
};
