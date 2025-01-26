import { api } from "@/services/api/api";
import { ActionTree } from "vuex";
import { DestinationOrderModule } from "../destination";
import { getDestinations } from "@/services/api/destination";

export const actions = <ActionTree<DestinationOrderModule, unknown>>{
  setError({ commit }, visible: boolean) {
    commit("setError", visible);
  },

  setLoading({ commit }, visible: boolean) {
    commit("setLoading", visible);
  },

  async getDestinations({ commit }) {
    commit("setLoading", true);
    commit("clearError");

    const [response, error] = await getDestinations(api)();

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
