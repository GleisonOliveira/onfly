import { GetterTree } from "vuex";
import { LoginType } from "@/types/login";
import { mutations } from "./login/mutations";
import { actions } from "./login/actions";

export type ErrorMessage = {
  title: string;
  message: string;
};
export interface LoginModuleType {
  type: LoginType;
  isSubmitting: boolean;
  error?: ErrorMessage;
}
const getters = <GetterTree<LoginModuleType, unknown>>{};

export const LoginModule = {
  namespaced: true,
  state: () => ({ type: "login", isSubmitting: false }),
  mutations: mutations,
  actions: actions,
  getters: getters,
};
