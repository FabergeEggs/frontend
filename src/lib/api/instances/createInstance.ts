import axios, { AxiosInstance } from "axios"
import { setAccessToken, getAccessToken, clearAccessToken } from "../tokenStore"
import { ApiRoutes } from "../constants"

export function createInstance(baseURL: string | undefined): AxiosInstance {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  })

  // Attach access token to every request
  instance.interceptors.request.use((config) => {
    const token = getAccessToken()
    console.log("CONFIG: ", config)
    console.log("TOKEN: ", token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  // Refresh on 401
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const origin = error.config
      if (
        error.response?.status === 401 &&
        origin &&
        !origin._isRetry
      ) {
        origin._isRetry = true
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_AUTH_API_URL}${ApiRoutes.REFRESH_TOKEN}`,
            {},
            { withCredentials: true }
          )
          setAccessToken(data.access_token)
          return instance.request(origin)
        } catch {
          clearAccessToken()
          if (typeof window !== "undefined") {
            window.location.href = "/login"
          }
        }
      }
      throw error
    }
  )

  return instance
}