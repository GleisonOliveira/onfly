import { ActionTree } from "vuex";
import { Modal } from "@/types/modal";
import { ModalModuleType } from "../modal";

export const actions = <ActionTree<ModalModuleType, unknown>>{
  showModal({ commit }, modal: Modal) {
    commit("showModal", { ...(modal ?? {}) });
  },
  hideModal({ commit }) {
    commit("hideModal");
  },
};
