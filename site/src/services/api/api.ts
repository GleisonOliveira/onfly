import { Login, LoginErrorResponse, LoginSuccessResponse } from "@/types/login";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL_API,
});

type AxiosRequestResponse<T, E> = Promise<[T?, E?, unknown?]>;

export const version = "api/v1";

const getAxiosError = <T, E>(error: unknown): [T?, E?, unknown?] => {
  if (axios.isAxiosError(error)) {
    const { response } = error;

    return [undefined, response as unknown as E, undefined];
  }

  return [undefined, undefined, error];
};

export const login = async (
  loginData: Login
): AxiosRequestResponse<LoginSuccessResponse, LoginErrorResponse> => {
  try {
    const { data } = await api.post<LoginSuccessResponse>(
      `${version}/login`,
      loginData
    );

    return [data, undefined, undefined];
  } catch (error) {
    return getAxiosError(error);
  }
};

export const signUp = async (
  signUpData: Login
): AxiosRequestResponse<LoginSuccessResponse, LoginErrorResponse> => {
  try {
    const { data } = await api.post<LoginSuccessResponse>(
      `${version}/signup`,
      signUpData
    );

    return [data, undefined, undefined];
  } catch (error) {
    return getAxiosError(error);
  }
};
