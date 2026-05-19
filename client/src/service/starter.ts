import type { AxiosInstance } from "axios";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

const api = createApiInstance();

export const request = async (
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: unknown,
) => {
  const result = await api({
    method,
    url: path,
    data: body ? JSON.stringify(body) : undefined,
  });
  console.log(result);
  if (!result.data.success) throw new Error(result.data);
  return result.data;
};
