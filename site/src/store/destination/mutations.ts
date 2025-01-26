import { MutationTree } from "vuex";
import { DestinationOrderModule } from "../destination";
import { Destination } from "@/types/destination";

export const mutations = <MutationTree<DestinationOrderModule>>{
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
