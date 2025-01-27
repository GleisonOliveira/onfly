import { AxiosInstance } from "axios";
import { getAxiosError, version } from "./api";
import { AxiosRequestResponse, ErrorResponse } from "@/types/api";
import {
  CreateOrder,
  OrderFilters,
  OrderResponse,
  OrderUpdate,
} from "@/types/order";
import { id } from "vuetify/lib/locale/index.mjs";

const getOrders =
  (api: AxiosInstance) =>
  async (
    orderFiltes: OrderFilters,
    loginAdmin = false
  ): AxiosRequestResponse<OrderResponse, ErrorResponse> => {
    try {
      const uri = loginAdmin ? `${version}/admin/order` : `${version}/order`;
      const params = new URLSearchParams(
        orderFiltes as unknown as Record<string, string>
      );
      const { data } = await api.get<OrderResponse>(
        `${uri}?${params.toString()}`
      );

      return [data, undefined, undefined];
    } catch (error) {
      return getAxiosError(error);
    }
  };

const createOrder =
  (api: AxiosInstance) =>
  async (
    createOrderParams: CreateOrder
  ): AxiosRequestResponse<OrderResponse, ErrorResponse> => {
    try {
      const { data } = await api.post<OrderResponse>(
        `${version}/order`,
        createOrderParams
      );

      return [data, undefined, undefined];
    } catch (error) {
      return getAxiosError(error);
    }
  };

const updateOrder =
  (api: AxiosInstance) =>
  async (
    id: string,
    orderUpdate: OrderUpdate
  ): AxiosRequestResponse<OrderResponse, ErrorResponse> => {
    try {
      const { data } = await api.put<OrderResponse>(
        `${version}/admin/order/${id}`,
        orderUpdate
      );

      return [data, undefined, undefined];
    } catch (error) {
      return getAxiosError(error);
    }
  };

export { getOrders, createOrder, updateOrder };
