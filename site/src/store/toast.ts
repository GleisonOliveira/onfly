import { Toast } from "@/types/toast";
import { GetterTree, MutationTree, ActionTree } from "vuex";

export interface ToastModuleType {
  toast: Toast;
}

const mutations = <MutationTree<ToastModuleType>>{
  showToast(state, toast: Toast) {
    state.toast = { ...state.toast, ...toast, showSnackbar: true };
  },
};

const actions = <ActionTree<ToastModuleType, unknown>>{
  showToast({ commit }, toast: Toast) {
    commit("showToast", { ...(toast ?? {}), showSnackbar: true });
  },
};

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
