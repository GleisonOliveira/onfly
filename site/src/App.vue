<template>
  <v-overlay v-model="loading" class="align-center justify-center">
    <v-progress-circular
      color="primary"
      size="64"
      indeterminate
    ></v-progress-circular>
  </v-overlay>
  <NavMenu />
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <template v-if="!loading && !error">
    <router-view />
  </template>
  <v-row no-gutters v-if="!loading && error">
    <v-col
      >Houve um erro ao carregar os dados, por favor tente novamente.</v-col
    >
  </v-row>
</template>

<style lang="scss">
body {
  min-width: 400px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
import { mapActions, mapState } from "vuex";
import NavMenu from "./components/NavMenu.vue";

export default {
  components: {
    NavMenu,
  },
  methods: {
    ...mapActions(["home/changeMainLoadingVisibility"]),
  },
  computed: mapState({
    loading: (state) => state.home.loading,
    error: (state) => state.home.error,
  }),
  created() {
    this.$store.dispatch("home/changeMainLoadingVisibility", false);
    this.$store.dispatch("home/getDestinations");
  },
};
</script>
