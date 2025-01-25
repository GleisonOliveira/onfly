import { GetterTree, MutationTree, ActionTree } from "vuex";
import { api, version } from "@/services/api/api";

type Destination = {
  id: string;
  name: string;
  airport: string;
};

interface HomeModule {
  destinations: Destination[];
  loading: boolean;
  error: boolean;
}

const mutations = <MutationTree<HomeModule>>{
  updateDestinations(state, destinations: Destination[]) {
    state.destinations = destinations;
  },

  toogleMainLoading(state) {
    state.loading = !state.loading;
  },

  changeMainLoadingVisibility(state, visible: boolean) {
    state.loading = visible;
  },

  showError(state, visible: boolean) {
    state.error = visible;
  },
};

const actions = <ActionTree<HomeModule, any>>{
  updateDestinations({ commit }, destinations: Destination[]) {
    commit("updateDestinations", destinations);
  },

  toogleMainLoading({ commit }) {
    commit("toogleMainLoading");
  },
  changeMainLoadingVisibility({ commit }, visible: boolean) {
    commit("changeMainLoadingVisibility", visible);
  },

  getDestinations({ commit }, { page } = {}) {
    api
      .get(`${version}/destination?page=${page ?? 1}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(() => commit("showError", true));
  },
};

const getters = <GetterTree<HomeModule, any>>{};

export const HomeModule = {
  namespaced: true,
  state: () => ({ destinations: [], error: false, loading: false }),
  mutations: mutations,
  actions: actions,
  getters: getters,
};
