import { Destination } from "@/types/destination";
import { GetterTree } from "vuex";
import { actions } from "./destination/actions";
import { mutations } from "./destination/mutations";

export interface DestinationOrderModule {
  loading: boolean;
  error?: boolean;
  errorMessage?: string;
  destinations: Destination[];
}

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
