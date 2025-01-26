import { MutationTree } from "vuex";
import { ToastModuleType } from "../toast";
import { Toast } from "@/types/toast";

export const mutations = <MutationTree<ToastModuleType>>{
  showToast(state, toast: Toast) {
    state.toast = { ...state.toast, ...toast, showSnackbar: true };
  },
};
