import { Modal } from "@/types/modal";
import { MutationTree } from "vuex";
import { ModalModuleType } from "../modal";

export const mutations = <MutationTree<ModalModuleType>>{
  showModal(state, modal: Modal) {
    state.modal = { ...state.modal, ...modal, showModal: true };
  },
  hideModal(state) {
    state.modal = { ...state.modal, showModal: false };
  },
};
