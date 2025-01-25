<template>
  <template v-if="type === 'login'">
    <LoginForm />
  </template>
  <template v-else>
    <SignUpForm />
  </template>
</template>
<script>
import { mapActions, mapState } from "vuex";
import LoginForm from "@/components/Login/LoginForm.vue";
import SignUpForm from "@/components/Login/SignUpForm.vue";

export default {
  components: {
    LoginForm,
    SignUpForm,
  },
  data() {
    return {
      showPassword: false,
    };
  },
  methods: {
    ...mapActions(["login/changeType"]),
  },
  computed: mapState({
    type: (state) => state.login.type,
  }),
};
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
