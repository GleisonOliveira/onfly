import { GetterTree, MutationTree, ActionTree } from "vuex";
import { signUp as apiSignUp, login as apiLogin } from "@/services/api/api";
import router from "@/router";
import { Login, SignUp } from "@/types/login";

type LoginType = "login" | "sign";

type ErrorMessage = {
  title: string;
  message: string;
};
interface LoginModule {
  type: LoginType;
  isSubmitting: boolean;
  error?: ErrorMessage;
}

const mutations = <MutationTree<LoginModule>>{
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

const actions = <ActionTree<LoginModule, unknown>>{
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
        dispatch("modal/showModal", {}, { root: true });
        commit("setError", {
          title: "Acesso não autorizado",
          message: "Houve um erro ao fazer login, tente novamente.",
        });
        return;
      }

      localStorage.setItem(process.env.VUE_APP_JWT_NAME, access_token);
      dispatch("user/setJwt", access_token, { root: true });
      router.push("/");

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
    const [response, error] = await apiSignUp(signUpData);

    if (response) {
      const {
        data: { access_token },
      } = response;

      commit("setIsSubmitting", false);

      if (!access_token) {
        dispatch("modal/showModal", {}, { root: true });
        dispatch("setError", {
          title: "Erro no cadastro",
          message: "Houve um erro ao fazer o cadastro, tente novamente.",
        });
        return;
      }

      localStorage.setItem(process.env.VUE_APP_JWT_NAME, access_token);
      dispatch("user/setJwt", access_token, { root: true });
      router.push("/");

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

const getters = <GetterTree<LoginModule, unknown>>{};

export const LoginModule = {
  namespaced: true,
  state: () => ({ type: "login", isSubmitting: false }),
  mutations: mutations,
  actions: actions,
  getters: getters,
};
