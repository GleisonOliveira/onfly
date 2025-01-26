import { api, version } from "@/services/api/api";
import { ActionTree } from "vuex";
import { HomeModuleType } from "../home";
import { Destination } from "@/types/destination";

export const actions = <ActionTree<HomeModuleType, unknown>>{
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
