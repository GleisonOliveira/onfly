import { MutationTree } from "vuex";
import { UserModuleType } from "../user";

export const mutations = <MutationTree<UserModuleType>>{
  setUser(state, { jwt, user, type }: Required<UserModuleType>) {
    state.jwt = jwt;
    state.user = user;
    state.type = type;
  },

  clearUser(state) {
    state.jwt = undefined;
    state.user = undefined;
  },
};
