import { MutationTree } from "vuex";
import { LoginType } from "@/types/login";
import { ErrorMessage, LoginModuleType } from "../login";

export const mutations = <MutationTree<LoginModuleType>>{
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
