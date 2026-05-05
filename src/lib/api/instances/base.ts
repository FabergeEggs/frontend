import axios, { AxiosInstance } from 'axios';
import { getAccessToken, setAccessToken, clearAccessToken } from '../tokenStore';
import { ApiRoutes } from '../constants';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const createInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Для httpOnly cookie с refresh token
  });

  // Attach access token to every request
  instance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Refresh on 401
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._isRetry) {
        originalRequest._isRetry = true;

        try {
          const { data } = await axios.post(
            `${BASE_URL}${ApiRoutes.REFRESH_TOKEN}`,
            {},
            { withCredentials: true }
          );

          setAccessToken(data.access_token);
          originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

          return instance(originalRequest);
        } catch {
          clearAccessToken();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// Экспортируем готовый инстанс
export const api = createInstance();