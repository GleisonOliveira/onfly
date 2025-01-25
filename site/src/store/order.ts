import { GetterTree, MutationTree, ActionTree } from "vuex";

export interface OrderModuleType {
  loading: boolean;
  error?: string;
}

const mutations = <MutationTree<OrderModuleType>>{};

const actions = <ActionTree<OrderModuleType, unknown>>{};

const getters = <GetterTree<OrderModuleType, unknown>>{};

export const OrderModule = {
  namespaced: true,
  state: () => ({ error: undefined, loading: true }),
  mutations: mutations,
  actions: actions,
  getters: getters,
};
