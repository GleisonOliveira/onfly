<template>
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
            <th class="text-left">ID</th>
            <th class="text-left" v-if="type === 'Admin'" colspan="3">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="order.id">
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
            <td>{{ order.id }}</td>
            <template v-if="type === 'Admin'">
              <td class="pl-2 pr-2">
                <v-btn
                  prepend-icon="mdi-close-circle-outline"
                  class="text-none"
                  color="red"
                  :loading="
                    (order.loading ?? false) &&
                    !order.finishing &&
                    (order.canceling ?? false)
                  "
                  @click="
                    updateOrder({
                      finished: false,
                      status: 'canceled',
                      index: index,
                      id: order.id,
                    })
                  "
                  type="submit"
                  :disabled="
                    order.status === 'canceled' ||
                    order.finished ||
                    (order.loading ?? false)
                  "
                  >Cancelar</v-btn
                >
              </td>
              <td class="pl-2 pr-2">
                <v-btn
                  prepend-icon="mdi-plane-car"
                  class="text-none"
                  color="green"
                  type="submit"
                  :loading="
                    (order.loading ?? false) &&
                    !order.finishing &&
                    !(order.canceling ?? false)
                  "
                  @click="
                    updateOrder({
                      finished: false,
                      status: 'approved',
                      index: index,
                      id: order.id,
                    })
                  "
                  :disabled="
                    order.status === 'approved' ||
                    order.finished ||
                    (order.loading ?? false)
                  "
                  >Aprovar</v-btn
                >
              </td>
              <td class="pl-2 pr-2">
                <v-btn
                  prepend-icon="mdi-content-save-check"
                  class="text-none"
                  color="blue"
                  type="submit"
                  :loading="!order.finished && (order.finishing ?? false)"
                  @click="
                    updateOrder({
                      finished: true,
                      status: order.status,
                      index: index,
                      id: order.id,
                    })
                  "
                  :disabled="
                    (order.loading && order.finishing) || order.finished
                  "
                  >Finalizar</v-btn
                >
              </td>
            </template>
          </tr>
        </tbody>
      </v-table>
    </v-col>
    <v-col v-if="orders.length > 0 && !loading && !error"
      ><v-pagination
        :length="meta.last_page ?? 1"
        total-visible="5"
        v-model="currentPage"
        active-color="#009efb"
      ></v-pagination>
    </v-col>
    <v-col
      cols="12"
      v-if="orders.length === 0 && !loading && !error"
      class="pl-15 pr-15 pt-15 pb-15 text-center"
    >
      <p v-if="type !== 'Admin'">
        Que pena, você não tem nenhum pedido, que tal fazer um nova reserva?
      </p>
      <p v-if="type === 'Admin'">
        Que pena, não encontramos nenhum pedido, tente novamente com outros
        filtros.
      </p>
      <p class="pt-5" v-if="type !== 'Admin'">
        <v-btn
          prepend-icon="mdi-plus"
          :disabled="loading || error"
          class="text-none"
          color="#009efb"
          @click="showModal(true)"
          >Fazer nova reserva</v-btn
        >
      </p>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { RootState } from "@/store";
import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";

export default defineComponent({
  computed: {
    ...mapState({
      loading: (state: unknown) => (state as RootState).order.loading,
      error: (state: unknown) => (state as RootState).order.error,
      orders: (state: unknown) => (state as RootState).order.orders,
      meta: (state: unknown) => (state as RootState).order.meta,
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
  methods: {
    ...mapActions({
      getOrders: "order/getOrders",
      showModal: "order/showModal",
      updateOrder: "order/updateOrder",
    }),
  },
});
</script>
