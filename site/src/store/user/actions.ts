import { ActionTree } from "vuex";
import { UserModuleType } from "../user";
import router from "@/router";

export const actions = <ActionTree<UserModuleType, unknown>>{
  setUser({ commit }, user: Required<UserModuleType>) {
    commit("setUser", user);
  },

  clearUser({ commit }) {
    commit("clearUser");
    localStorage.removeItem(process.env.VUE_APP_JWT_NAME);
    router.push("/");
  },
};
