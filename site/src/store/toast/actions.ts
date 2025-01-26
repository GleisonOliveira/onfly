import { ActionTree } from "vuex";
import { ToastModuleType } from "../toast";
import { Toast } from "@/types/toast";

export const actions = <ActionTree<ToastModuleType, unknown>>{
  showToast({ commit }, toast: Toast) {
    commit("showToast", { ...(toast ?? {}), showSnackbar: true });
  },
};
