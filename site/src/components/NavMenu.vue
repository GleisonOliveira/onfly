<template>
  <nav id="navbar">
    <v-container>
      <v-row align="center">
        <v-col sm="4">
          <router-link to="/">
            <img alt="Onfly" src="../assets/logo.png" id="logo" />
          </router-link>
        </v-col>
        <v-col sm="8" id="links">
          <router-link :to="url" class="menu-item"
            ><v-icon icon="mdi-account" /> MINHA CONTA</router-link
          >
        </v-col>
      </v-row>
    </v-container>
  </nav>
</template>

<script lang="ts">
import { RootState } from "@/store";
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  computed: {
    ...mapState({
      user: (state: unknown) => (state as RootState).user?.user,
    }),
    url() {
      if (!this.user || !localStorage.getItem(process.env.VUE_APP_JWT_NAME)) {
        return "/login";
      }

      return "/dashboard";
    },
  },
});
</script>

<style lang="scss" scoped>
#logo {
  display: block;
  max-width: 100px;
}
.menu-item {
  color: var(--blue);
  transition: 350ms;
  text-decoration: none;
  font-weight: normal;
  border: solid 2px var(--blue);
  border-radius: 56px;
  padding: 10px 20px;
  &:hover {
    background-color: var(--orange);
    color: white;
    border-color: var(--orange);
  }
}
#links {
  text-align: right;
}
</style>
