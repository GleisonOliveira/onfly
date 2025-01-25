<template>
  <MainComponent>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png" />
      Numero de clicks
    </div>
  </MainComponent>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainComponent from "@/components/main/MainComponent.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    MainComponent,
  },
});
</script>
