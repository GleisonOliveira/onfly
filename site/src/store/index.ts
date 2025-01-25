import { createStore } from "vuex";
import VuexPersister from "vuex-persister";
import { HomeModule } from "./home";
import { LoginModule } from "./login";
import { ToastModule } from "./toast";
import { UserModule } from "./user";
import { ModalModule } from "./modal";

const vuexLocal = new VuexPersister({
  key: "onfly",
  statesToPersist: ["user"],
});

export default createStore({
  state: {
    loading: false,
  },
  getters: {},
  mutations: {
    showLoading(state, visible: boolean) {
      state.loading = visible;
    },
  },
  actions: {
    showLoading({ commit }, visible: boolean) {
      commit("showLoading", visible);
    },
  },
  modules: {
    home: HomeModule,
    login: LoginModule,
    toast: ToastModule,
    user: UserModule,
    modal: ModalModule,
  },
  plugins: [vuexLocal.persist],
});
