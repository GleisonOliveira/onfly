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
        <Form
          v-else
          @submit="submit"
          :initial-values="initialValues"
          :validation-schema="schema"
          v-slot="{ values, setFieldValue }"
        >
          {{ values }}
          <v-locale-provider locale="pt">
            <v-row>
              <v-col cols="6" class="pt-0 pb-0">
                <Field name="departure_date" v-slot="{ field, errors }">
                  <label for="departure_date">Data de partida</label>
                  <DatePicker
                    id="departure_date"
                    v-bind="field"
                    :error-messages="errors"
                    :min="departure_date"
                    @onSelectDate="
                      (date: Date) => {
                        setDepartureDate(date);
                        setFieldValue('departure_date', date);
                      }
                    "
                    v-model="departure_date"
                  />
                </Field>
              </v-col>
              <v-col cols="6" class="pt-0 pb-0">
                <Field name="arrive_date" v-slot="{ field, errors }">
                  <label for="arrive_date">Data de chegada</label>
                  <DatePicker
                    id="arrive_date"
                    v-bind="field"
                    :error-messages="errors"
                    :min="departure_date"
                    :date="arrive_date"
                    @onSelectDate="
                      (date: Date) => {
                        setArriveDate(date);
                        setFieldValue('arrive_date', date);
                      }
                    "
                    v-model="departure_date"
                  />
                </Field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pt-0 pb-0">
                <Field name="destination" v-slot="{ field, errors }">
                  <label for="destination">Local</label>
                  <v-select
                    id="destination"
                    item-title="title"
                    item-value="id"
                    placeholder="Escolha um destino"
                    :items="destinations"
                    v-bind="field"
                    :error-messages="errors"
                    variant="outlined"
                  ></v-select>
                </Field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pt-0 pb-2 text-right">
                <v-btn
                  prepend-icon="mdi-content-save-check"
                  :disabled="loading || error"
                  class="text-none"
                  color="#009efb"
                  type="submit"
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
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import ErrorComponent from "../errors/ErrorComponent.vue";
import LoadingComponent from "../dialogs/LoadingComponent.vue";
import DatePicker from "../date/DatePicker.vue";

export default defineComponent({
  components: {
    Form,
    Field,
    ErrorComponent,
    LoadingComponent,
    DatePicker,
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
      initialValues: (state: unknown) => ({
        departure_date: (state as RootState).order.order.departure_date,
        arrive_date: (state as RootState).order.order.arrive_date,
      }),
    }),
    schema() {
      return yup.object({
        daparture_date: yup
          .date()
          .required("A data de partida é obrigatória.")
          .min(
            this.today,
            "A data de partida deve ser maior que a data de hoje."
          ),
        arrive_date: yup
          .date()
          .required("A data de chegada é obrigatória.")
          .min(
            this.departure_date,
            "A data de partida deve ser maior que a data de partida."
          ),
        destination_id: yup
          .string()
          .uuid("O destino é obrigatório.")
          .required("O destino é obrigatório."),
      });
    },
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
      setArriveDate: "order/setArriveDate",
      setDepartureDate: "order/setDepartureDate",
      getDestinations: "destinations/getDestinations",
    }),
    submit: (values: unknown) => console.log(values),
    emitiu: () => console.log("emitu"),
  },
});
</script>
