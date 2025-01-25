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

<script>
import { mapState } from "vuex";

export default {
  name: "ToastMessage",
  computed: {
    ...mapState({
      toast: ({ toast: { toast } }) => toast,
    }),
  },
};
</script>
