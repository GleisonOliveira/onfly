<template>
  <v-dialog v-model="modal.showModal" :width="modal.width">
    <slot></slot>
  </v-dialog>
</template>

<script lang="ts">
import { RootState } from "@/store";
import { Modal } from "@/types/modal";
import { mapState } from "vuex";

interface DialogModalData {
  modal: Modal;
}
export default {
  name: "ToastMessage",
  computed: {
    ...mapState<DialogModalData>({
      modal: ({ modal: { modal } }: RootState) => modal,
    }),
  },
};
</script>
