import axios from "axios";
import { ApiRoutes } from './constants'


// AUTH INSTANCE
const axiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL,
  baseURL: "http://localhost:8001",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const origin = error.config;
    if (
      error.response &&
      error.response.status == 401 &&
      origin &&
      !origin._isRetry
    ) {
      origin._isRetry = true;
      try {
        // await axios.head(
        //   `${process.env.NEXT_PUBLIC_API_URL}${ApiRoutes.REFRESH_TOKEN}`,
        //   { withCredentials: true }
        // );
        await axiosInstance.post(
          // `${process.env.NEXT_PUBLIC_AUTH_API_URL}${ApiRoutes.REFRESH_TOKEN}`,
          `http://localhost:8001${ApiRoutes.REFRESH_TOKEN}`,
          { withCredentials: true }
        );
        return axiosInstance.request(origin);
      } catch (e) {
        console.log(e);
        // if (typeof window !== "undefined") {
        //   window.location.href = "/login";
        // }
      }
    }
    throw error;
  }
);

export default axiosInstance;