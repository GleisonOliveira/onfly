<template>
  <v-snackbar
    :color="toast.color"
    :timeout="toast.timer"
    v-model="toast.showSnackbar"
    bottom
    right
  >
    <v-icon left>{{ toast.icon }}</v-icon> {{ toast.message }}
  </v-snackbar>
</template>

<script lang="ts">
import { RootState } from "@/store";
import { Toast } from "@/types/toast";
import { defineComponent } from "vue";
import { mapState } from "vuex";

interface ToastMessageData {
  toast: Toast;
}
export default defineComponent<ToastMessageData>({
  name: "ToastMessage",
  computed: {
    ...mapState<ToastMessageData>({
      toast: ({ toast: { toast } }: RootState) => toast,
    }),
  },
});
</script>
