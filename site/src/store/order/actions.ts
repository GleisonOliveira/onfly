import { api } from "@/services/api/api";
import { createOrder, getOrders, updateOrder } from "@/services/api/order";
import { OrderFilters, OrderStatuses, OrderUpdate } from "@/types/order";
import { ActionTree } from "vuex";
import { addDays, format, set, subDays } from "date-fns";
import { OrderModuleType } from "../order";
import { TZDate } from "@date-fns/tz";
import { RootState } from "..";

const getOrderUpdate = (orderStatuses: OrderStatuses): OrderUpdate => {
  if (orderStatuses.finished) {
    return { finished: true };
  }

  return { finished: false, status: orderStatuses.status };
};

const getOrderFilters = ({
  id,
  name,
  departure_date,
  status,
}: OrderFilters) => {
  const filters: OrderFilters = {};

  if (status && status !== "all") {
    filters.status = status;
  }

  if (id) {
    filters.id = id;
  }

  if (name) {
    filters.name = name;
  }

  if (departure_date) {
    const departureDate = new TZDate(
      set(departure_date, { hours: 0, minutes: 0, seconds: 0 }),
      "UTC"
    );
    filters.departure_date = format(departureDate, "yyyy-MM-dd HH:mm:ss");
  }

  return filters;
};
export const actions = <ActionTree<OrderModuleType, unknown>>{
  setPage({ commit }, page: number) {
    commit("setPage", page);
  },

  setArriveDate({ commit }, date: Date) {
    commit("setArriveDate", date);
  },

  setFilters({ commit }, filters: OrderFilters) {
    commit("setFilters", filters);
  },

  setDepartureDateFilter({ commit }, period: string) {
    commit("setPeriod", period);

    if (period === "all") {
      return;
    }

    const datePeriod = new Date();

    if (period === "7") {
      commit("setFilters", {
        departure_date: subDays(datePeriod, 7),
      });
      return;
    }

    if (period === "30") {
      commit("setFilters", {
        departure_date: subDays(datePeriod, 30),
      });
      return;
    }
    if (period === "90") {
      commit("setFilters", {
        departure_date: subDays(datePeriod, 90),
      });
      return;
    }

    commit("setFilters", {
      departure_date: subDays(datePeriod, 365),
    });
  },

  setDepartureDate(
    {
      commit,
      state: {
        order: { arrive_date },
      },
    },
    {
      date,
      setFieldValue,
    }: { date: Date; setFieldValue?: (f: string, value: unknown) => void }
  ) {
    commit("setDepartureDate", date);
    if (setFieldValue) {
      setFieldValue("dep_date", date);
    }

    if (setFieldValue && arrive_date <= date) {
      setFieldValue("arrive_date", addDays(date, 1));
      commit("setArriveDate", addDays(date, 1));
    }
  },

  setDestinationId({ commit }, destinationId: string) {
    commit("setDestinationId", destinationId);
  },

  setOrderStatuses({ commit }, orderStatuses: OrderStatuses) {
    commit("setOrderStatuses", orderStatuses);
  },

  showModal({ commit, dispatch }, visible: boolean) {
    commit("showModal", visible);

    if (!visible) return;

    dispatch("destinations/getDestinations", null, { root: true });
  },

  async getOrders({ commit, state, rootState }, page = 1) {
    commit("setLoading", true);
    commit("clearError");

    const filters = {
      ...state.filters,
      ...getOrderFilters(state.orderFilters),
    };
    const isLoginAdmin = (rootState as RootState).user.type === "Admin";

    const [response, error] = await getOrders(api)(
      {
        ...filters,
        page: page,
      },
      isLoginAdmin
    );

    if (error || !response || !response.data) {
      commit(
        "setError",
        error
          ? error.data?.message
          : "Houve um erro ao buscar os pedidos, tente novamente."
      );
      commit("setLoading", false);

      return;
    }

    const { data, meta } = response;

    commit("setOrders", data);
    commit("setMeta", meta);
    commit("setLoading", false);
  },

  async createOrder({
    dispatch,
    state: {
      order: { arrive_date, destination_id, dep_date },
    },
  }) {
    const initialDate = new TZDate(
      set(dep_date, { hours: 0, minutes: 0, seconds: 0 }),
      "UTC"
    );
    const endDate = new TZDate(
      set(arrive_date, { hours: 0, minutes: 0, seconds: 0 }),
      "UTC"
    );
    const [response, error] = await createOrder(api)({
      departure_date: format(initialDate, "yyyy-MM-dd HH:mm:ss"),
      arrive_date: format(endDate, "yyyy-MM-dd HH:mm:ss"),
      destination_id: destination_id,
    });

    if (error || !response || !response.data) {
      dispatch(
        "toast/showToast",
        {
          icon: "mdi-close-circle-outline",
          color: "error",
          message: error
            ? error.data?.message
            : "Houve um erro ao buscar criar seu pedido, tente novamente.",
        },
        { root: true }
      );

      return;
    }

    dispatch("order/getOrders", null, { root: true });
    dispatch("order/showModal", false, { root: true });
  },

  async updateOrder(
    { commit, dispatch },
    orderStatuses: OrderStatuses & { id: string }
  ) {
    commit("setOrderLoading", {
      loading: true,
      index: orderStatuses.index,
      finishing: orderStatuses.finished,
      canceling: orderStatuses.status === "canceled",
    });
    const orderUpdate = getOrderUpdate(orderStatuses);
    const [response, error] = await updateOrder(api)(
      orderStatuses.id,
      orderUpdate
    );

    if (error || !response || !response.data) {
      dispatch(
        "toast/showToast",
        {
          icon: "mdi-close-circle-outline",
          color: "error",
          message: error
            ? error.data?.message
            : "Houve um erro ao buscar atualizar o status, tente novamente.",
        },
        { root: true }
      );

      commit("setOrderLoading", {
        loading: false,
        index: orderStatuses.index,
        finishing: false,
      });

      return;
    }

    dispatch(
      "toast/showToast",
      {
        icon: "mdi-check",
        color: "green",
        message: "Reserva atualizada com sucesso",
      },
      { root: true }
    );

    commit("setOrderLoading", {
      loading: false,
      index: orderStatuses.index,
      finishing: false,
    });
    commit("setOrderStatuses", {
      finished: orderStatuses.finished,
      status: orderStatuses.status,
      index: orderStatuses.index,
    });
  },
};
