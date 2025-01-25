<template>
  <v-row>
    <v-col cols="12" class="text-center pt-15 pb-5">
      <v-icon :icon="icon" size="84" color="red-accent-1"></v-icon>
    </v-col>
    <v-col cols="12" class="text-center pl-15 pr-15"> {{ message }} </v-col>
    <v-col v-if="tryAgain" cols="12" class="text-center pt-5">
      <v-btn class="text-none" @click="tryAgain()" color="#009efb">{{
        tryAgainText
      }}</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    message: {
      type: String,
      default:
        "Tivemos um problema ao carregar os dados, clique no botão abaixo para tentar novamente.",
    },
    icon: {
      type: String,
      default: "mdi-heart-broken",
    },
    tryAgain: {
      type: Function,
      default: null,
    },
    tryAgainText: {
      type: String,
      default: "Tentar novamente",
    },
  },
});
</script>
