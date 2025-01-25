import { createStore } from "vuex";
import VuexPersister from "vuex-persister";
import { HomeModule } from "./home";
import { LoginModule } from "./login";
import { ToastModule } from "./toast";
import { UserModule } from "./user";

const vuexLocal = new VuexPersister({
  key: "onfly",
  statesToPersist: ["user"],
});

export default createStore({
  state: {
    teste: true,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    home: HomeModule,
    login: LoginModule,
    toast: ToastModule,
    user: UserModule,
  },
  plugins: [vuexLocal.persist],
});
