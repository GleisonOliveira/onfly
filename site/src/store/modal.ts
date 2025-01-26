import { Modal } from "@/types/modal";
import { GetterTree } from "vuex";
import { actions } from "./modal/actions";
import { mutations } from "./modal/mutations";
export interface ModalModuleType {
  modal: Modal;
}

const getters = <GetterTree<ModalModuleType, unknown>>{};

export const ModalModule = {
  namespaced: true,
  state: () => ({
    modal: {
      width: "auto",
      showModal: false,
    },
  }),
  mutations: mutations,
  actions: actions,
  getters: getters,
};
