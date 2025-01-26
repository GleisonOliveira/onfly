import { AxiosInstance } from "axios";
import { getAxiosError, version } from "./api";
import { AxiosRequestResponse, ErrorResponse } from "@/types/api";
import { OrderFilters, OrderResponse } from "@/types/order";

const getOrders =
  (api: AxiosInstance) =>
  async (
    orderFiltes: OrderFilters
  ): AxiosRequestResponse<OrderResponse, ErrorResponse> => {
    try {
      const params = new URLSearchParams(
        orderFiltes as unknown as Record<string, string>
      );
      const { data } = await api.get<OrderResponse>(
        `${version}/order?${params.toString()}`
      );

      return [data, undefined, undefined];
    } catch (error) {
      return getAxiosError(error);
    }
  };

export { getOrders };
