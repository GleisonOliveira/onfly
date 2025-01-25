<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <v-btn @click.prevent="increment"> Clicar </v-btn>
    Numero de clicks {{ count }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
});
</script>

<!-- <v-row no-gutters v-if="!loading && error">
  <v-col
    >Houve um erro ao carregar os dados, por favor tente novamente.</v-col
  >
</v-row> -->

<!-- <script>
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
</script> -->
