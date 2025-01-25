<template>
  <DialogModal>
    <v-card class="mx-auto" width="400">
      <v-card-text class="bg-surface-light pt-4">
        <v-row>
          <v-col cols="12" class="text-center pt-10 pb-2">
            <v-icon icon="mdi-close-circle-outline" color="red" size="80" />
          </v-col>
          <v-col cols="12" class="text-center pt-2">
            {{ error.message }}
          </v-col>
          <v-col cols="12" class="text-center pb-2">
            <v-btn
              class="ms-auto text-none"
              text="Fechar"
              color="#009efb"
              @click="hideModal()"
            ></v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </DialogModal>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DialogModal from "@/components//dialogs/DialogModal.vue";

export default {
  components: {
    DialogModal,
  },
  data() {
    return {
      showPassword: false,
    };
  },
  methods: {
    ...mapActions({
      hideModal: "modal/hideModal",
    }),
  },
  computed: mapState({
    error: ({ login: { error } }) => error,
  }),
};
</script>
