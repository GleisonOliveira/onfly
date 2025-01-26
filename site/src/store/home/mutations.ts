import { MutationTree } from "vuex";
import { HomeModuleType } from "../home";
import { Destination } from "@/types/destination";

export const mutations = <MutationTree<HomeModuleType>>{
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
