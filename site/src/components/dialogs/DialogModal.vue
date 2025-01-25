<template>
  <v-dialog v-model="modal.showModal" :width="modal.width">
    <slot></slot>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ToastMessage",
  computed: {
    ...mapState({
      modal: ({ modal: { modal } }) => modal,
    }),
  },
};
</script>
