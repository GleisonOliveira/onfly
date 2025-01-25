import { GetterTree, MutationTree, ActionTree } from "vuex";
import {
  signUp as apiSignUp,
  login as apiLogin,
  version,
} from "@/services/api/api";
import router from "@/router";
import { Login, SignUp } from "@/types/login";

type LoginType = "login" | "sign";

interface LoginModule {
  type: LoginType;
  isSubmitting: boolean;
}

const mutations = <MutationTree<LoginModule>>{
  changeType(state, type: LoginType) {
    state.type = type;
  },

  setIsSubmitting(state, isSubmitting: boolean) {
    state.isSubmitting = isSubmitting;
  },
};

const actions = <ActionTree<LoginModule, any>>{
  changeType({ commit }, type: LoginType) {
    commit("setIsSubmitting", false);
    commit("changeType", type);
  },

  setIsSubmitting({ commit }, isSubmitting: boolean) {
    commit("setIsSubmitting", isSubmitting);
  },

  async login({ commit, dispatch }, loginData: Login) {
    commit("setIsSubmitting", true);
    const [response, error] = await apiLogin(loginData);

    if (response) {
      const {
        data: { access_token },
      } = response;

      commit("setIsSubmitting", false);

      if (!access_token) {
        dispatch(
          "toast/showToast",
          {
            message: "Houve um erro ao fazer login, tente novamente.",
            color: "red",
            icon: "mdi-close-thick",
          },
          { root: true }
        );
        return;
      }

      localStorage.setItem("onfly.jwt", access_token);
      dispatch("user/setJwt", access_token, { root: true });
      router.push("/");

      return;
    }

    commit("setIsSubmitting", false);
    dispatch(
      "toast/showToast",
      {
        message: error
          ? error.data?.message
          : "Houve um erro ao fazer login, tente novamente.",
        color: "red",
        icon: "mdi-close-thick",
      },
      { root: true }
    );
  },

  async signup({ commit, dispatch }, signUpData: SignUp) {
    commit("setIsSubmitting", true);
    const [response, error] = await apiSignUp(signUpData);

    if (response) {
      const {
        data: { access_token },
      } = response;

      commit("setIsSubmitting", false);

      if (!access_token) {
        dispatch(
          "toast/showToast",
          {
            message: "Houve um erro ao fazer o cadastro, tente novamente.",
            color: "red",
            icon: "mdi-close-thick",
          },
          { root: true }
        );
        return;
      }

      localStorage.setItem("onfly.jwt", access_token);
      dispatch("user/setJwt", access_token, { root: true });
      router.push("/");

      return;
    }

    commit("setIsSubmitting", false);
    dispatch(
      "toast/showToast",
      {
        message: error
          ? error.data?.message
          : "Houve um erro ao fazer o cadastro, tente novamente.",
        color: "red",
        icon: "mdi-close-thick",
      },
      { root: true }
    );
  },
};

const getters = <GetterTree<LoginModule, any>>{};

export const LoginModule = {
  namespaced: true,
  state: () => ({ type: "login", isSubmitting: false }),
  mutations: mutations,
  actions: actions,
  getters: getters,
};
