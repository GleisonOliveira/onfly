<template>
  <MainContent />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainContent from "@/components/dashboard/MainContent.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    MainContent,
  },
});
</script>
