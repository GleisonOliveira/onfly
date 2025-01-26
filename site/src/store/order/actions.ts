import { api } from "@/services/api/api";
import { createOrder, getOrders } from "@/services/api/order";
import { OrderFilters } from "@/types/order";
import { ActionTree } from "vuex";
import { addDays, format, set, subDays } from "date-fns";
import { OrderModuleType } from "../order";

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
    filters.departure_date = format(
      set(departure_date, { hours: 0, minutes: 0, seconds: 0 }),
      "yyyy-MM-dd HH:mm:ss"
    );
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

  showModal({ commit, dispatch }, visible: boolean) {
    commit("showModal", visible);

    if (!visible) return;

    dispatch("destinations/getDestinations", null, { root: true });
  },

  async getOrders({ commit, state }, page = 1) {
    commit("setLoading", true);
    commit("clearError");

    const filters = {
      ...state.filters,
      ...getOrderFilters(state.orderFilters),
    };

    const [response, error] = await getOrders(api)({
      ...filters,
      page: page,
    });

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
    const [response, error] = await createOrder(api)({
      departure_date: format(
        set(dep_date, { hours: 0, minutes: 0, seconds: 0 }),
        "yyyy-MM-dd HH:mm:ss"
      ),
      arrive_date: format(
        set(arrive_date, { hours: 0, minutes: 0, seconds: 0 }),
        "yyyy-MM-dd HH:mm:ss"
      ),
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
};
