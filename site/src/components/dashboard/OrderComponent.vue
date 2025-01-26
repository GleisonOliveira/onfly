<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="text-right">
        <v-btn
          prepend-icon="mdi-refresh"
          :disabled="loading || error"
          class="text-none mr-2"
          color="#009efb"
          variant="text"
          @click="getOrders()"
          >Atualizar</v-btn
        >
        <v-btn
          prepend-icon="mdi-plus"
          :disabled="loading || error"
          class="text-none"
          color="#009efb"
          @click="showModal(true)"
          >Novo pedido</v-btn
        >
      </v-col>
    </v-row>
    <LoadingComponent v-if="loading" />
    <ErrorComponent v-if="!loading && error" :tryAgain="tryAgain" />
    <v-row>
      <v-col cols="12">
        <v-table v-if="!loading && !error">
          <thead>
            <tr>
              <th class="text-left">Nome</th>
              <th class="text-left">Destino</th>
              <th class="text-left">Aeroporto</th>
              <th class="text-left">Status</th>
              <th class="text-left">Finalizado</th>
              <th class="text-left">Ida</th>
              <th class="text-left">Volta</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td>{{ order.user.name }}</td>
              <td>{{ order.destination.name }}</td>
              <td>{{ order.destination.airport }}</td>
              <td>
                <v-chip
                  color="blue"
                  v-if="order.status === 'pending'"
                  density="comfortable"
                  size="small"
                >
                  Pendente
                </v-chip>
                <v-chip
                  color="red"
                  v-else-if="order.status === 'canceled'"
                  density="comfortable"
                  size="small"
                >
                  Cancelado
                </v-chip>
                <v-chip color="green" v-else density="comfortable" size="small">
                  Aprovado
                </v-chip>
              </td>
              <td>
                <v-chip
                  color="red"
                  v-if="order.finished"
                  density="comfortable"
                  size="small"
                >
                  Finalizado
                </v-chip>
                <v-chip color="green" v-else density="comfortable" size="small">
                  Em aberto
                </v-chip>
              </td>
              <td>{{ order.departure_date }}</td>
              <td>{{ order.arrive_date }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
      <v-col v-if="orders.length > 0"
        ><v-pagination
          :length="meta.last_page ?? 1"
          total-visible="5"
          v-model="filters.page"
          active-color="#009efb"
        ></v-pagination>
      </v-col>
      <v-col
        cols="12"
        v-if="orders.length === 0"
        class="pl-15 pr-15 pt-15 pb-15 text-center"
      >
        <p>
          Que pena, vocë não tem nenhum pedido, que tal fazer um novo pedido?
        </p>
        <p class="pt-5">
          <v-btn
            prepend-icon="mdi-plus"
            :disabled="loading || error"
            class="text-none"
            color="#009efb"
            @click="showModal(true)"
            >Fazer novo pedido</v-btn
          >
        </p>
      </v-col>
    </v-row>
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

export default defineComponent({
  components: {
    LoadingComponent,
    ErrorComponent,
    NewOrderModal,
  },
  watch: {
    filters: {
      handler() {
        this.getOrders();
      },
      deep: true,
    },
  },
  computed: {
    ...mapState({
      loading: (state: unknown) => (state as RootState).order.loading,
      error: (state: unknown) => (state as RootState).order.error,
      orders: (state: unknown) => (state as RootState).order.orders,
      meta: (state: unknown) => (state as RootState).order.meta,
      filters: (state: unknown) => (state as RootState).order.filters,
    }),
  },
  created() {
    this.getOrders();
  },
  methods: {
    ...mapActions({
      getOrders: "order/getOrders",
      showModal: "order/showModal",
    }),
    tryAgain() {
      console.log(1);
    },
  },
});
</script>
