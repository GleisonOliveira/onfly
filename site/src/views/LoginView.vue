<template>
  <template v-if="type === 'login'">
    <LoginForm />
  </template>
  <template v-else>
    <SignUpForm />
  </template>
  <LoginModal />
</template>
<script lang="ts">
import { mapState } from "vuex";
import LoginForm from "@/components/login/LoginForm.vue";
import SignUpForm from "@/components/login/SignUpForm.vue";
import LoginModal from "@/components/login/LoginModal.vue";
import router from "@/router";
import { RootState } from "@/store";
import { LoginType } from "@/types/login";
import { ErrorMessage } from "@/store/login";
import { defineComponent } from "vue";

interface LoginViewData {
  type: LoginType;
  error: ErrorMessage;
}

export default defineComponent<LoginViewData>({
  components: {
    LoginForm,
    SignUpForm,
    LoginModal,
  },
  data() {
    return {
      showPassword: false,
    };
  },
  created() {
    if (localStorage.getItem(process.env.VUE_APP_JWT_NAME)) {
      router.push("/");
      return;
    }
  },
  computed: mapState<LoginViewData>({
    type: ({ login: { type } }: RootState) => type,
    error: ({ login: { error } }: RootState) => error,
  }),
});
</script>

<style lang="scss">
#login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  background-image: url("../assets/images/login.jpg");
  background-position: right 21vw center;
  background-size: cover;

  & > div {
    & > div {
      height: 100%;
      background-color: white;
    }
  }

  & img {
    display: inline-block;
    width: 100%;
    max-width: 250px;
  }
}

body,
html {
  height: 100vh;
  min-height: 300px;
}

#app {
  height: 100vh;
}
</style>
