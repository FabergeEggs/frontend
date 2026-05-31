import axios, { AxiosInstance, isAxiosError } from "axios";
import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../../store/tokenStore";
import { setUserId } from "../../store/userStore";
import { ApiRoutes } from "../constants";
import { parseAxiosError } from "../errors";

const refreshUrl = `${process.env.NEXT_PUBLIC_API_URL}${ApiRoutes.AUTH.REFRESH}`;

export function createInstance(baseURL: string | undefined = process.env.NEXT_PUBLIC_API_URL): AxiosInstance {
  /** Type of baseURL is "string | undefined" because in .env file variables are of this type */
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });

  // Attach access token to every request
  instance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ONLY log on server (dev only)
    if (typeof window === "undefined" && process.env.NODE_ENV === "development") {
      console.log("📤 REQUEST:", {
        url: config.url,
        method: config.method,
        headers: config.headers,
        data: config.data
      });
    }

    return config;
  });

  // Refresh on 401
  instance.interceptors.response.use(
    (response) => {
      if (typeof window === "undefined" && process.env.NODE_ENV === "development") {
        console.log("📥 RESPONSE:", response.status, response.data);
      }
      return response;
    },
    async (error) => {
      const origin = error.config;

      if (
        isAxiosError(error) &&
        error.response?.status === 401 &&
        origin &&
        !origin._isRetry
      ) {
        origin._isRetry = true;
        try {
          const { data } = await axios.post(
            refreshUrl,
            {},
            { withCredentials: true },
          );
          setAccessToken(data.access_token);
          origin.headers.Authorization = `Bearer ${data.access_token}`;
          return instance.request(origin);
        } catch {
          clearAccessToken();
          setUserId("");
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }
      }

      throw parseAxiosError(error);
    },
  );

  return instance;
}
