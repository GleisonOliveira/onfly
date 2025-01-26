import { Order, OrderFilters } from "@/types/order";
import { Meta } from "@/types/paginating";
import { GetterTree } from "vuex";
import { addDays } from "date-fns";
import { mutations } from "./order/mutations";
import { actions } from "./order/actions";

export interface OrderModuleType {
  order: {
    arrive_date: Date;
    dep_date: Date;
    today: Date;
    destination_id: string;
  };
  showModal: boolean;
  loading: boolean;
  error?: boolean;
  errorMessage?: string;
  orders: Order[];
  meta: Meta;
  period: string;
  filters: {
    page: number;
  };
  orderFilters: OrderFilters & {
    status: Pick<Order, "status"> | "all" | undefined;
  };
}

const getters = <GetterTree<OrderModuleType, unknown>>{};

export const OrderModule = {
  namespaced: true,
  state: () => ({
    order: {
      dep_date: addDays(new Date(), 1),
      arrive_date: addDays(new Date(), 2),
      today: new Date(),
      destination_id: null,
    },
    orderFilters: {
      status: "all",
    },
    showModal: false,
    error: undefined,
    loading: true,
    ErrorMessage: undefined,
    period: "all",
    meta: {},
    orders: [],
    filters: {
      page: 1,
    },
  }),
  mutations: mutations,
  actions: actions,
  getters: getters,
};
