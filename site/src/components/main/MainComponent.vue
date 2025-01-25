<template>
  <NavMenu />
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavMenu from "@/components/NavMenu.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    NavMenu,
  },
});
</script>
