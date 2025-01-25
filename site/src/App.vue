<template>
  <v-overlay v-model="loading" class="align-center justify-center">
    <v-progress-circular
      color="primary"
      size="64"
      indeterminate
    ></v-progress-circular>
  </v-overlay>
  <router-view />
  <ToastMessage />
</template>

<style lang="scss">
body {
  min-width: 400px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<script>
import { mapState } from "vuex";
import ToastMessage from "./components/ToastMessage.vue";

export default {
  components: {
    ToastMessage,
  },
  computed: mapState({
    loading: (state) => state.home.loading,
  }),
};
</script>
