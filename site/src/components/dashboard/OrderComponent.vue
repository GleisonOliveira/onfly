<template>
  <v-container fluid>
    <v-row> </v-row>
    <LoadingComponent />

    <ErrorComponent :tryAgain="tryAgain" />
  </v-container>
</template>

<script lang="ts">
import LoadingComponent from "@/components/dialogs/LoadingComponent.vue";
import ErrorComponent from "@/components/errors/ErrorComponent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    LoadingComponent,
    ErrorComponent,
  },
  methods: {
    tryAgain() {
      console.log(1);
    },
  },
});
</script>
