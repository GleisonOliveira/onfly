import { GetterTree, MutationTree, ActionTree } from "vuex";

interface UserModule {
  jwt?: string;
}

const mutations = <MutationTree<UserModule>>{
  setJwt(state, jwt: string) {
    state.jwt = jwt;
  },

  clearJwt(state) {
    state.jwt = undefined;
  },
};

const actions = <ActionTree<UserModule, unknown>>{
  setJwt({ commit }, jwt: string) {
    commit("setJwt", jwt);
  },

  clearJwt({ commit }) {
    commit("clearJwt");
  },
};

const getters = <GetterTree<UserModule, unknown>>{};

export const UserModule = {
  namespaced: true,
  state: () => ({ jwt: undefined }),
  mutations: mutations,
  actions: actions,
  getters: getters,
};
