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
          <router-link to="/" class="menu-item"
            ><v-icon icon="mdi-home" /> MINHA CONTA</router-link
          >
        </v-col>
      </v-row>
    </v-container>
  </nav>
  <nav></nav>
</template>

<style lang="scss" scoped>
#logo {
  display: block;
  max-width: 100px;
}
.menu-item {
  color: #1f6391;
  transition: 350ms;
  text-decoration: none;
  font-weight: normal;
  border: solid 2px #1f6391;
  border-radius: 56px;
  padding: 10px 20px;
  &:hover {
    background-color: #ff5a05;
    color: white;
    border-color: #ff5a05;
  }
}
#links {
  text-align: right;
}
</style>
