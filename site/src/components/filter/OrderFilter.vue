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
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" lg="3" class="pl-4">
          <v-text-field
            label="Destino"
            variant="outlined"
            :disabled="disabled"
            placeholder="Nome do destino"
            density="compact"
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
          ></v-select>
        </v-col>
        <v-col cols="12" md="3" lg="2" class="pl-4">
          <v-select
            label="Período"
            variant="outlined"
            density="compact"
            item-title="title"
            item-value="value"
            :disabled="disabled"
            :items="statuses"
          ></v-select>
        </v-col>
        <v-col cols="12" md="3" lg="2" class="pl-4">
          <v-btn
            prepend-icon="mdi-filter"
            :disabled="disabled"
            class="text-none"
            color="#009efb"
            type="submit"
            block
            >Buscar</v-btn
          >
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { RootState } from "@/store";
import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";

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
    }),
  },
  computed: {
    id: {
      get(): string | undefined {
        return this.$store.state.order.orderFilters.id;
      },
      set(value: string) {
        this.setFilters({ name: value });
      },
    },
    statuses: () => [
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
  },
});
</script>
