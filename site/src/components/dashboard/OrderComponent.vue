<template>
  <v-container fluid>
    <v-row> </v-row>
    <LoadingComponent v-if="loading" />
    <ErrorComponent v-if="!loading && error" :tryAgain="tryAgain" />
  </v-container>
</template>

<script lang="ts">
import LoadingComponent from "@/components/dialogs/LoadingComponent.vue";
import ErrorComponent from "@/components/errors/ErrorComponent.vue";
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  components: {
    LoadingComponent,
    ErrorComponent,
  },
  computed: {
    ...mapState({
      loading: ({ order: { loading } }) => loading,
      error: ({ order: { error } }) => error,
    }),
  },
  methods: {
    tryAgain() {
      console.log(1);
    },
  },
});
</script>
