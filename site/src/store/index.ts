import { createStore } from "vuex";
import VuexPersister from "vuex-persister";
import { HomeModule, HomeModuleType } from "./home";
import { LoginModule, LoginModuleType } from "./login";
import { ToastModule, ToastModuleType } from "./toast";
import { UserModule, UserModuleType } from "./user";
import { ModalModule, ModalModuleType } from "./modal";
import { OrderModule, OrderModuleType } from "./order";

const vuexLocal = new VuexPersister({
  key: "onfly",
  statesToPersist: ["user"],
});

interface RootState {
  loading: boolean;
  home?: HomeModuleType;
  user?: UserModuleType;
  login?: LoginModuleType;
  modal?: ModalModuleType;
  toast?: ToastModuleType;
  order?: OrderModuleType;
}
export default createStore<RootState>({
  state: {
    loading: false,
  },
  getters: {
    getUser: (state) => state.user,
  },
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
    order: OrderModule,
  },
  plugins: [vuexLocal.persist],
});
