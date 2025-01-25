import { AxiosInstance } from "axios";
import { getAxiosError, version } from "./api";
import { AxiosRequestResponse, ErrorResponse } from "@/types/api";
import { OrderResponse } from "@/types/order";

const getOrders =
  (api: AxiosInstance) =>
  async (): AxiosRequestResponse<OrderResponse, ErrorResponse> => {
    try {
      const { data } = await api.get<OrderResponse>(`${version}/order`);

      return [data, undefined, undefined];
    } catch (error) {
      return getAxiosError(error);
    }
  };

export { getOrders };
