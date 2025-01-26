import { GetterTree } from "vuex";
import { Destination } from "@/types/destination";
import { mutations } from "./home/mutations";
import { actions } from "./home/actions";

export interface HomeModuleType {
  destinations: Destination[];
  loading: boolean;
  error: boolean;
}

const getters = <GetterTree<HomeModuleType, unknown>>{};

export const HomeModule = {
  namespaced: true,
  state: () => ({ destinations: [], error: false, loading: false }),
  mutations: mutations,
  actions: actions,
  getters: getters,
};
