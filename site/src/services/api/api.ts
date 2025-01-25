import router from "@/router";
import axios from "axios";
import { login, signUp } from "./login";
import { getOrders } from "./order";

export const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL_API,
});

export const version = "api/v1";

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(process.env.VUE_APP_JWT_NAME);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    if (response.status === 421) {
      localStorage.removeItem(process.env.VUE_APP_JWT_NAME);
      router.push("/login");
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const getAxiosError = <T, E>(error: unknown): [T?, E?, unknown?] => {
  if (axios.isAxiosError(error)) {
    const { response } = error;

    return [undefined, response as unknown as E, undefined];
  }

  return [undefined, undefined, error];
};

export { login, signUp, getOrders };
