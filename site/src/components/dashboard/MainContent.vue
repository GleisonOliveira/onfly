<template>
  <v-app>
    <v-navigation-drawer
      v-model="showDrawer"
      location="left"
      mobile-breakpoint="sm"
    >
      <v-card color="#f9f9f9" round="0" elevation="0">
        <v-list class="text-center">
          <v-list-item>
            <router-link to="/dashboard">
              <img alt="Onfly" src="../../assets/logo.png" id="logo" />
            </router-link>
          </v-list-item>
        </v-list>
      </v-card>
      <v-list>
        <v-list-item :subtitle="email" :title="name"> </v-list-item>
      </v-list>
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-ticket"
          title="Pedidos"
          value="Pedidos"
          active-class="text-blue"
          active
          to="/dashboard"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-logout"
          exact
          title="Sair"
          value="Sair"
          @click="signOut()"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-toolbar color="#f9f9f9">
        <v-toolbar-title class="text-blue">Pedidos</v-toolbar-title>
        <v-app-bar-nav-icon
          class="d-md-none d-sm-none"
          color="blue"
          @click="showDrawer = !showDrawer"
        ></v-app-bar-nav-icon>
      </v-toolbar>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";

export default defineComponent({
  data() {
    return { showDrawer: true };
  },
  methods: {
    ...mapActions({
      signOut: "user/clearUser",
    }),
  },
  computed: {
    ...mapState({
      name: ({ user }) => (user.user ? user.user.name ?? "" : ""),
      email: ({ user }) => (user.user ? user.user.email ?? "" : ""),
    }),
  },
});
</script>

<style lang="scss" scoped>
#logo {
  display: block;
  width: 40%;
}
</style>
