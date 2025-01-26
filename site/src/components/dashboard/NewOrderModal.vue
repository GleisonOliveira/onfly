<template>
  <v-dialog width="600px" v-model="show">
    <v-card title="Novo pedido">
      <v-card-text class="pt-4">
        <ErrorComponent
          v-if="!loading && error"
          :message="errorMessage"
          :tryAgain="getDestinations"
        />
        <LoadingComponent v-if="loading" />
        <Form v-else>
          <v-locale-provider locale="pt">
            <v-row>
              <v-col cols="6" class="pt-0 pb-0">
                <label for="departure_date">Data de partida</label>
                <v-date-input
                  prepend-icon=""
                  id="departure_date"
                  prepend-inner-icon="mdi-calendar"
                  variant="outlined"
                  placeholder="dd/mm/yyyy"
                  locale="ptBR"
                  v-model="departure_date"
                  :min="today"
                ></v-date-input>
              </v-col>
              <v-col cols="6" class="pt-0 pb-0">
                <label for="arrive_date">Data de chegada</label>
                <v-date-input
                  prepend-icon=""
                  id="arrive_date"
                  prepend-inner-icon="mdi-calendar"
                  variant="outlined"
                  placeholder="dd/mm/yyyy"
                  locale="ptBR"
                  v-model="arrive_date"
                  :min="departure_date"
                ></v-date-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pt-0 pb-0">
                <label for="destination">Local</label>
                <v-select
                  id="destination"
                  item-title="title"
                  item-value="id"
                  placeholder="Escolha um destino"
                  :items="destinations"
                  variant="outlined"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pt-0 pb-2 text-right">
                <v-btn
                  prepend-icon="mdi-content-save-check"
                  :disabled="loading || error"
                  class="text-none"
                  color="#009efb"
                  @click="showModal(true)"
                  >Salvar pedido</v-btn
                >
              </v-col>
            </v-row>
          </v-locale-provider>
        </Form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import { RootState } from "@/store";
import { Form } from "vee-validate";
import ErrorComponent from "../errors/ErrorComponent.vue";
import LoadingComponent from "../dialogs/LoadingComponent.vue";

export default defineComponent({
  components: {
    Form,
    ErrorComponent,
    LoadingComponent,
  },
  computed: {
    ...mapState({
      error: (state: unknown) => (state as RootState).destinations.error,
      departure_date: (state: unknown) =>
        (state as RootState).order.order.departure_date,
      arrive_date: (state: unknown) =>
        (state as RootState).order.order.arrive_date,
      today: (state: unknown) => (state as RootState).order.order.today,
      errorMessage: (state: unknown) =>
        (state as RootState).destinations.errorMessage,
      loading: (state: unknown) => (state as RootState).destinations.loading,
      destinations: (state: unknown) =>
        (state as RootState).destinations.destinations.map((destination) => ({
          id: destination.id,
          title: `${destination.name} - ${destination.airport}`,
        })),
    }),
    show: {
      get(): boolean {
        return this.$store.state.order.showModal;
      },
      set() {
        this.showModal(false);
      },
    },
  },
  methods: {
    ...mapActions({
      showModal: "order/showModal",
      getDestinations: "destinations/getDestinations",
    }),
  },
});
</script>
