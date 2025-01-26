import { User } from "@/types/user";
import { GetterTree } from "vuex";
import { mutations } from "./user/mutations";
import { actions } from "./user/actions";

export interface UserModuleType {
  jwt?: string;
  user?: User;
  type?: "Admin" | "User";
}

const getters = <GetterTree<UserModuleType, unknown>>{};

export const UserModule = {
  namespaced: true,
  state: () => ({ jwt: undefined }),
  mutations: mutations,
  actions: actions,
  getters: getters,
};
