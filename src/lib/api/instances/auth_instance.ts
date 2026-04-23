import axios, { AxiosInstance } from "axios";

function createInstance(baseURL: string | undefined): AxiosInstance {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });

  return instance;
}


export default createInstance(process.env.NEXT_PUBLIC_AUTH_API_URL)