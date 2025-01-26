<template>
  <v-dialog width="600px" v-model="show">
    <v-card title="Nova reserva">
      <v-card-text class="pt-4">
        <ErrorComponent
          v-if="!loading && error"
          :message="errorMessage"
          :tryAgain="getDestinations"
        />
        <LoadingComponent v-if="loading" />
        <Form
          v-else
          @submit="createOrder"
          :initial-values="initialValues"
          :validation-schema="schema"
          v-slot="{ setFieldValue, isSubmitting }"
        >
          <v-locale-provider locale="pt">
            <v-row>
              <v-col cols="6" class="pt-0 pb-0">
                <Field name="dep_date" v-slot="{ field }">
                  <label for="dep_date">Data de partida</label>
                  <DatePicker
                    id="dep_date"
                    v-bind="field"
                    :min="today"
                    :date="dep_date"
                    @onSelectDate="
                      (date: Date) => {
                        setDepartureDate({date, setFieldValue});
                      }
                    "
                    v-model="dep_date"
                  />
                </Field>
              </v-col>
              <v-col cols="6" class="pt-0 pb-0">
                <Field name="arrive_date" v-slot="{ field }">
                  <label for="arrive_date">Data de chegada</label>
                  <DatePicker
                    id="arrive_date"
                    v-bind="field"
                    :min="dep_date"
                    :date="arrive_date"
                    @onSelectDate="
                      (date: Date) => {
                        setArriveDate(date);
                        setFieldValue('arrive_date', date);
                      }
                    "
                    v-model="arrive_date"
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
                    :error-messages="errors"
                    v-bind="field"
                    variant="outlined"
                    @update:modelValue="(destinationId: string) => {
                        setDestinationId(destinationId);
                        setFieldValue('destination_id', destinationId);
                      }"
                  ></v-select>
                </Field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pt-0 pb-2 text-right">
                <v-btn
                  prepend-icon="mdi-content-save-check"
                  :disabled="loading || error || isSubmitting"
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
      arrive_date: (state: unknown) =>
        (state as RootState).order.order.arrive_date,
      dep_date: (state: unknown) => (state as RootState).order.order.dep_date,
      today: (state: unknown) => (state as RootState).order.order.today,
      errorMessage: (state: unknown) =>
        (state as RootState).destinations.errorMessage,
      loading: (state: unknown) => (state as RootState).destinations.loading,
      destinations: (state: unknown) =>
        (state as RootState).destinations.destinations.map((destination) => ({
          id: destination.id,
          title: `${destination.name} - ${destination.airport}`,
        })),
      initialValues: (state: unknown) => {
        return {
          dep_date: (state as RootState).order.order.dep_date,
          arrive_date: (state as RootState).order.order.arrive_date,
        };
      },
    }),
    schema() {
      return yup.object({
        dep_date: yup
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
            this.dep_date,
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
      setDestinationId: "order/setDestinationId",
      setDepartureDate: "order/setDepartureDate",
      createOrder: "order/createOrder",
      getDestinations: "destinations/getDestinations",
    }),
  },
});
</script>
