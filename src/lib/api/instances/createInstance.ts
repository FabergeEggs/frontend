import axios, { AxiosInstance, isAxiosError } from "axios";
import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../../store/tokenStore";
import { ApiRoutes } from "../constants";
import { parseAxiosError } from "../errors";

const refreshUrl = `${process.env.NEXT_PUBLIC_API_URL}${ApiRoutes.AUTH.REFRESH}`;

export function createInstance(baseURL: string | undefined = process.env.NEXT_PUBLIC_API_URL): AxiosInstance {
  /**
   * Resolve baseURL for client-side usage. If `process.env.NEXT_PUBLIC_API_URL` was
   * not provided at build time, fall back to the developer default
   * (protocol + hostname + :8080) so requests don't go to the page origin.
   */
  // Prefer configured baseURL; otherwise assume local dev API on HTTP port 8080.
  // Use explicit "http" here because the page may be served over https and
  // we want the dev API to use plain HTTP on :8080.
  const resolvedBaseURL = baseURL ?? (typeof window !== "undefined"
    ? `http://${window.location.hostname}:8080`
    : undefined);

  const instance = axios.create({
    baseURL: resolvedBaseURL,
    withCredentials: true,
  });

    // Attach access token to every request
    instance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // DEBUG
    console.log("📤 REQUEST:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    });

    return config;
  });

  // Refresh on 401
  instance.interceptors.response.use(
    (response) => {
      // DEBUG
      console.log("📥 RESPONSE:", response.status, response.data);
      return response;
    },
    async (error) => {
      const origin = error.config;
      console.log("📥 ERROR:", {status: error.response?.status, data: error.response?.data, config: origin});

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
