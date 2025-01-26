import { api } from "@/services/api/api";
import { getDestinatios } from "@/services/api/destination";
import { Destination } from "@/types/destination";
import { GetterTree, MutationTree, ActionTree } from "vuex";

export interface DestinationOrderModule {
  loading: boolean;
  error?: boolean;
  errorMessage?: string;
  destinations: Destination[];
}

const mutations = <MutationTree<DestinationOrderModule>>{
  setLoading(state, loading: boolean) {
    state.loading = loading;
  },

  setError(state, errorMessage: string) {
    state.error = true;
    state.errorMessage = errorMessage;
  },

  setDestinations(state, destinations: Destination[]) {
    state.destinations = destinations;
  },

  clearError(state) {
    state.error = false;
    state.errorMessage = undefined;
  },
};

const actions = <ActionTree<DestinationOrderModule, unknown>>{
  setError({ commit }, visible: boolean) {
    commit("setError", visible);
  },

  setLoading({ commit }, visible: boolean) {
    commit("setLoading", visible);
  },

  async getDestinations({ commit }) {
    commit("setLoading", true);
    commit("clearError");

    const [response, error] = await getDestinatios(api)();

    if (error || !response || !response.data) {
      commit(
        "setError",
        error
          ? error.data?.message
          : "Houve um erro ao buscar os destinos, tente novamente."
      );
      commit("setLoading", false);

      return;
    }

    const { data } = response;

    commit("setDestinations", data);
    commit("setLoading", false);
  },
};

const getters = <GetterTree<DestinationOrderModule, unknown>>{};

export const DestinationsModule = {
  namespaced: true,
  state: () => ({
    showModal: true,
    error: undefined,
    loading: true,
    ErrorMessage: undefined,
    destinations: [],
  }),
  mutations: mutations,
  actions: actions,
  getters: getters,
};
