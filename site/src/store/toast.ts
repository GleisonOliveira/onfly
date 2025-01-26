import { Toast } from "@/types/toast";
import { GetterTree } from "vuex";
import { mutations } from "./toast/mutations";
import { actions } from "./toast/actions";

export interface ToastModuleType {
  toast: Toast;
}

const getters = <GetterTree<ToastModuleType, unknown>>{};

export const ToastModule = {
  namespaced: true,
  state: () => ({
    toast: {
      message: 'missing "message".',
      color: "success",
      timer: 5000,
      icon: "mdi-check",
      showSnackbar: false,
    },
  }),
  mutations: mutations,
  actions: actions,
  getters: getters,
};
