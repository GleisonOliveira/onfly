import { api } from "@/services/api/api";
import { createOrder, getOrders } from "@/services/api/order";
import { Order } from "@/types/order";
import { Meta } from "@/types/paginating";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { addDays, format, set } from "date-fns";

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
  filters: {
    page: number;
  };
}

const mutations = <MutationTree<OrderModuleType>>{
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

  setPage(state, page: number) {
    state.filters.page = page;
  },

  clearError(state) {
    state.error = false;
    state.errorMessage = undefined;
  },
};

const actions = <ActionTree<OrderModuleType, unknown>>{
  setPage({ commit }, page: number) {
    commit("setPage", page);
  },

  setArriveDate({ commit }, date: Date) {
    commit("setArriveDate", date);
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

  async getOrders({ commit, state }) {
    commit("setLoading", true);
    commit("clearError");

    const [response, error] = await getOrders(api)({ ...state.filters });

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
    showModal: false,
    error: undefined,
    loading: true,
    ErrorMessage: undefined,
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
