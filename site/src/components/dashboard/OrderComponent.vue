<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="text-right">
        <v-btn
          prepend-icon="mdi-refresh"
          :disabled="loading"
          class="text-none mr-2"
          color="#009efb"
          variant="text"
          @click="getOrders()"
          >Atualizar</v-btn
        >
        <v-btn
          v-if="type !== 'Admin'"
          prepend-icon="mdi-plus"
          :disabled="loading || error"
          class="text-none"
          color="#009efb"
          @click="showModal(true)"
          >Nova reserva</v-btn
        >
      </v-col>
    </v-row>
    <OrderFilter :disabled="loading" />
    <v-divider />
    <LoadingComponent v-if="loading" />
    <ErrorComponent
      v-if="!loading && error"
      :message="errorMessage"
      :tryAgain="getOrders"
    />
    <OrderTable />
  </v-container>
  <NewOrderModal />
</template>

<script lang="ts">
import LoadingComponent from "@/components/dialogs/LoadingComponent.vue";
import ErrorComponent from "@/components/errors/ErrorComponent.vue";
import { RootState } from "@/store";
import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";
import NewOrderModal from "./NewOrderModal.vue";
import OrderFilter from "../filter/OrderFilter.vue";
import OrderTable from "../table/OrderTable.vue";

export default defineComponent({
  components: {
    LoadingComponent,
    ErrorComponent,
    NewOrderModal,
    OrderFilter,
    OrderTable,
  },
  computed: {
    ...mapState({
      loading: (state: unknown) => (state as RootState).order.loading,
      error: (state: unknown) => (state as RootState).order.error,
      errorMessage: (state: unknown) => (state as RootState).order.errorMessage,
      orders: (state: unknown) => (state as RootState).order.orders,
      meta: (state: unknown) => (state as RootState).order.meta,
      filters: (state: unknown) => (state as RootState).order.filters,
      type: (state: unknown) => (state as RootState).user.type,
    }),
    currentPage: {
      get(): number {
        return this.$store.state.order.meta.current_page;
      },
      set(page: number) {
        this.getOrders(page);
      },
    },
  },
  created() {
    this.getOrders();
  },
  methods: {
    ...mapActions({
      getOrders: "order/getOrders",
      showModal: "order/showModal",
    }),
  },
});
</script>
