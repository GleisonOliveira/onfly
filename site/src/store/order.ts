import { api } from "@/services/api/api";
import { getOrders } from "@/services/api/order";
import { Order } from "@/types/order";
import { Meta } from "@/types/paginating";
import { GetterTree, MutationTree, ActionTree } from "vuex";

export interface OrderModuleType {
  order: {
    departure_date: Date;
    arrive_date: Date;
    today: Date;
    destination_id: Date;
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
};

const getters = <GetterTree<OrderModuleType, unknown>>{};

export const OrderModule = {
  namespaced: true,
  state: () => ({
    order: {
      departure_date: new Date(),
      arrive_date: new Date(),
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
