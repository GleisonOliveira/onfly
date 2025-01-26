import { AxiosInstance } from "axios";
import { getAxiosError, version } from "./api";
import { AxiosRequestResponse, ErrorResponse } from "@/types/api";
import { DestinationResponse } from "@/types/destination";

const getDestinatios =
  (api: AxiosInstance) =>
  async (): AxiosRequestResponse<DestinationResponse, ErrorResponse> => {
    try {
      const { data } = await api.get<DestinationResponse>(
        `${version}/destination`
      );

      return [data, undefined, undefined];
    } catch (error) {
      return getAxiosError(error);
    }
  };

export { getDestinatios };
