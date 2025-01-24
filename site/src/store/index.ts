import { createStore } from "vuex";
import VuexPersister from "vuex-persister";
import { HomeModule } from "./home";

const vuexLocal = new VuexPersister({
  key: "onfly",
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
  },
  plugins: [vuexLocal.persist],
});
