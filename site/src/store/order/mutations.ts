import { Order, OrderFilters, OrderStatuses } from "@/types/order";
import { Meta } from "@/types/paginating";
import { MutationTree } from "vuex";
import { OrderModuleType } from "../order";

export const mutations = <MutationTree<OrderModuleType>>{
  setLoading(state, loading: boolean) {
    state.loading = loading;
  },

  setArriveDate(state, date: Date) {
    state.order.arrive_date = date;
  },

  setDestinationId(state, destinationId: string) {
    state.order.destination_id = destinationId;
  },

  setDepartureDate(state, date: Date) {
    state.order.dep_date = date;
  },

  showModal(state, visible: boolean) {
    state.showModal = visible;
  },

  setError(state, errorMessage: string) {
    state.error = true;
    state.errorMessage = errorMessage;
  },

  setOrders(state, orders: Order[]) {
    state.orders = orders;
  },

  setMeta(state, meta: Meta) {
    state.meta = meta;
  },

  setPeriod(state, period: string) {
    state.period = period;
  },

  setPage(state, page: number) {
    state.filters.page = page;
  },

  setOrderStatuses(state, { finished, status, index }: OrderStatuses) {
    state.orders[index].finished = finished;
    state.orders[index].status = status;
  },

  setOrderLoading(
    state,
    {
      loading,
      index,
      finishing,
      canceling,
    }: {
      loading: boolean;
      index: number;
      finishing: boolean;
      canceling: boolean;
    }
  ) {
    state.orders[index].loading = loading;
    state.orders[index].finishing = finishing;
    state.orders[index].canceling = canceling;
  },

  setFilters(state, filters: OrderFilters) {
    const { orderFilters } = state;
    const newFilters = { ...orderFilters, ...filters };

    state.orderFilters.name = newFilters.name ?? undefined;
    state.orderFilters.id = newFilters.id ?? undefined;
    state.orderFilters.status = newFilters.status ?? undefined;
    state.orderFilters.departure_date = newFilters.departure_date ?? undefined;
  },

  clearError(state) {
    state.error = false;
    state.errorMessage = undefined;
  },
};
