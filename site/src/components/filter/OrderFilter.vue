<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col cols="12" class="pl-4">
          <p class="text-subtitle-1 text-blue">Filtros</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" lg="3" class="pl-4">
          <v-text-field
            label="Id"
            v-model="id"
            variant="outlined"
            :disabled="disabled"
            placeholder="Id do pedido"
            density="compact"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" lg="3" class="pl-4">
          <v-text-field
            label="Destino"
            variant="outlined"
            v-model="name"
            :disabled="disabled"
            placeholder="Nome do destino"
            density="compact"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" lg="2" class="pl-4">
          <v-select
            label="Status"
            variant="outlined"
            density="compact"
            item-title="title"
            item-value="value"
            :disabled="disabled"
            :items="statuses"
            v-model="status"
          ></v-select>
        </v-col>
        <v-col cols="12" md="3" lg="2" class="pl-4">
          <v-select
            label="Data de partida"
            variant="outlined"
            density="compact"
            item-title="title"
            item-value="value"
            :disabled="disabled"
            :items="periods"
            v-model="period"
          ></v-select>
        </v-col>
        <v-col cols="12" md="3" lg="2" class="pl-4">
          <v-btn
            prepend-icon="mdi-filter"
            :disabled="disabled"
            class="text-none"
            color="#009efb"
            type="submit"
            @click="getOrders(1)"
            block
            >Buscar</v-btn
          >
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Order } from "@/types/order";
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    ...mapActions({
      setFilters: "order/setFilters",
      setDepartureDateFilter: "order/setDepartureDateFilter",
      getOrders: "order/getOrders",
    }),
  },
  computed: {
    id: {
      get(): string | undefined {
        return this.$store.state.order.orderFilters.id;
      },
      set(value: string) {
        this.setFilters({ id: value });
      },
    },
    name: {
      get(): string | undefined {
        return this.$store.state.order.orderFilters.name;
      },
      set(value: string) {
        this.setFilters({ name: value });
      },
    },
    status: {
      get(): Pick<Order, "status"> | "all" | undefined {
        return this.$store.state.order.orderFilters.status;
      },
      set(value: string) {
        this.setFilters({ status: value });
      },
    },
    period: {
      get(): string {
        return this.$store.state.order.period;
      },
      set(value: string) {
        this.setDepartureDateFilter(value);
      },
    },
    statuses: () => [
      {
        title: "Todos",
        value: "all",
      },
      {
        title: "Pendente",
        value: "pending",
      },
      {
        title: "Cancelado",
        value: "canceled",
      },
      {
        title: "Aprovado",
        value: "approved",
      },
    ],
    periods: () => [
      {
        title: "Todos",
        value: "all",
      },
      {
        title: "Últimos 7 dias",
        value: "7",
      },
      {
        title: "Últimos 30 dias",
        value: "30",
      },
      {
        title: "Últimos 90 dias",
        value: "90",
      },
      {
        title: "Último ano",
        value: "365",
      },
    ],
  },
});
</script>
