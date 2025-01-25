import router from "@/router";
import { User } from "@/types/login";
import { GetterTree, MutationTree, ActionTree } from "vuex";

export interface UserModuleType {
  jwt?: string;
  user?: User;
}

const mutations = <MutationTree<UserModuleType>>{
  setUser(state, { jwt, user }: Required<UserModuleType>) {
    state.jwt = jwt;
    state.user = user;
  },

  clearUser(state) {
    state.jwt = undefined;
    state.user = undefined;
  },
};

const actions = <ActionTree<UserModuleType, unknown>>{
  setUser({ commit }, user: Required<UserModuleType>) {
    commit("setUser", user);
  },

  clearUser({ commit }) {
    commit("clearUser");
    localStorage.removeItem(process.env.VUE_APP_JWT_NAME);
    router.push("/");
  },
};

const getters = <GetterTree<UserModuleType, unknown>>{};

export const UserModule = {
  namespaced: true,
  state: () => ({ jwt: undefined }),
  mutations: mutations,
  actions: actions,
  getters: getters,
};
