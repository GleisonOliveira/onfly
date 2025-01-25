import { GetterTree, MutationTree, ActionTree } from "vuex";

type Modal = {
  width?: string | number;
  showModal?: boolean;
};
export interface ModalModuleType {
  modal: Modal;
}

const mutations = <MutationTree<ModalModuleType>>{
  showModal(state, modal: Modal) {
    state.modal = { ...state.modal, ...modal, showModal: true };
  },
  hideModal(state) {
    state.modal = { ...state.modal, showModal: false };
  },
};

const actions = <ActionTree<ModalModuleType, unknown>>{
  showModal({ commit }, modal: Modal) {
    commit("showModal", { ...(modal ?? {}) });
  },
  hideModal({ commit }) {
    commit("hideModal");
  },
};

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
