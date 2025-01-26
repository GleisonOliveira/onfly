import { GetterTree, MutationTree, ActionTree } from "vuex";
import { api, login, signUp } from "@/services/api/api";
import router from "@/router";
import { Login, LoginType, SignUp } from "@/types/login";

export type ErrorMessage = {
  title: string;
  message: string;
};
export interface LoginModuleType {
  type: LoginType;
  isSubmitting: boolean;
  error?: ErrorMessage;
}

const mutations = <MutationTree<LoginModuleType>>{
  changeType(state, type: LoginType) {
    state.type = type;
  },

  setIsSubmitting(state, isSubmitting: boolean) {
    state.isSubmitting = isSubmitting;
  },

  setError(state, error: ErrorMessage) {
    state.error = error;
  },
};

const actions = <ActionTree<LoginModuleType, unknown>>{
  changeType({ commit }, type: LoginType) {
    commit("setIsSubmitting", false);
    commit("changeType", type);
  },

  setIsSubmitting({ commit }, isSubmitting: boolean) {
    commit("setIsSubmitting", isSubmitting);
  },

  async login({ commit, dispatch }, loginData: Login) {
    commit("setIsSubmitting", true);
    const [response, error] = await login(api)(loginData);

    if (response) {
      const { data } = response;

      commit("setIsSubmitting", false);

      if (!data.access_token) {
        dispatch("modal/showModal", {}, { root: true });
        commit("setError", {
          title: "Acesso não autorizado",
          message: "Houve um erro ao fazer login, tente novamente.",
        });
        return;
      }

      localStorage.setItem(process.env.VUE_APP_JWT_NAME, data.access_token);
      dispatch("user/setUser", data, { root: true });
      router.push("/dashboard");

      return;
    }

    commit("setIsSubmitting", false);
    commit("setError", {
      title: "Acesso não autorizado",
      message: error
        ? error.data?.message
        : "Houve um erro ao fazer login, tente novamente.",
    });
    dispatch("modal/showModal", {}, { root: true });
  },

  async signup({ commit, dispatch }, signUpData: SignUp) {
    commit("setIsSubmitting", true);
    const [response, error] = await signUp(api)(signUpData);

    if (response) {
      const { data } = response;

      commit("setIsSubmitting", false);

      if (!data.access_token) {
        dispatch("modal/showModal", {}, { root: true });
        dispatch("setError", {
          title: "Erro no cadastro",
          message: "Houve um erro ao fazer o cadastro, tente novamente.",
        });
        return;
      }

      localStorage.setItem(process.env.VUE_APP_JWT_NAME, data.access_token);
      dispatch("user/setUser", data, { root: true });
      router.push("/dashboard");

      return;
    }

    commit("setIsSubmitting", false);
    commit("setError", {
      title: "Erro no cadastro",
      message: error
        ? error.data?.message
        : "Houve um erro ao fazer o cadastro, tente novamente.",
    });
    dispatch("modal/showModal", {}, { root: true });
  },
};

const getters = <GetterTree<LoginModuleType, unknown>>{};

export const LoginModule = {
  namespaced: true,
  state: () => ({ type: "login", isSubmitting: false }),
  mutations: mutations,
  actions: actions,
  getters: getters,
};
