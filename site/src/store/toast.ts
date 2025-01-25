import { GetterTree, MutationTree, ActionTree } from "vuex";

type Toast = {
  message?: string;
  color?: string;
  timer?: number;
  icon?: string;
  showSnackbar?: boolean;
};
interface ToastModule {
  toast: Toast;
}

const mutations = <MutationTree<ToastModule>>{
  showToast(state, toast: Toast) {
    state.toast = { ...state.toast, ...toast, showSnackbar: true };
  },
};

const actions = <ActionTree<ToastModule, unknown>>{
  showToast({ commit }, toast: Toast) {
    commit("showToast", { ...(toast ?? {}), showSnackbar: true });
  },
};

const getters = <GetterTree<ToastModule, unknown>>{};

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
