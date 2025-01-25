import { Login, LoginResponse } from "@/types/login";
import { AxiosInstance } from "axios";
import { getAxiosError, version } from "./api";
import { AxiosRequestResponse, ErrorResponse } from "@/types/api";

const login =
  (api: AxiosInstance) =>
  async (
    loginData: Login
  ): AxiosRequestResponse<LoginResponse, ErrorResponse> => {
    try {
      const { data } = await api.post<LoginResponse>(
        `${version}/login`,
        loginData
      );

      return [data, undefined, undefined];
    } catch (error) {
      return getAxiosError(error);
    }
  };

const signUp =
  (api: AxiosInstance) =>
  async (
    signUpData: Login
  ): AxiosRequestResponse<LoginResponse, ErrorResponse> => {
    try {
      const { data } = await api.post<LoginResponse>(
        `${version}/signup`,
        signUpData
      );

      return [data, undefined, undefined];
    } catch (error) {
      return getAxiosError(error);
    }
  };

export { login, signUp };
