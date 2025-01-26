<template>
  <div>
    <v-menu
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      v-model="menu"
      min-width="auto"
    >
      <template v-slot:activator="{ props }">
        <v-text-field
          :prepend-icon="prependIcon"
          :id="id"
          v-model="formattedDate"
          :prepend-inner-icon="prependInnerIcon"
          variant="outlined"
          :error-messages="errorMessages"
          :placeholder="placeholder"
          readonly
          v-bind="props"
        ></v-text-field>
      </template>
      <v-card>
        <v-date-picker
          v-model="selectedDate"
          no-title
          scrollable
          hide-header
          :min="min"
          :max="max"
        ></v-date-picker>
        <v-card-actions class="d-flex justify-end">
          <v-btn @click="cancel">Cancelar</v-btn>
          <v-btn
            @click="confirm"
            color="#009efb"
            class="blue--text text--darken-2"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { format } from "date-fns";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    prependIcon: {
      type: String,
      default: "",
    },
    errorMessages: {
      default: () => [],
    },
    format: {
      type: String,
      default: "dd/MM/yyyy",
    },
    id: {
      type: String,
      default: "arrive_date",
    },
    prependInnerIcon: {
      type: String,
      default: "mdi-calendar",
    },
    placeholder: {
      type: String,
      default: "dd/mm/yyyy",
    },
    min: {
      type: Date,
      default: undefined,
    },
    max: {
      type: Date,
      default: undefined,
    },
    date: {
      type: Date,
      default: null,
    },
  },
  data() {
    return {
      selectedDate: new Date(),
      formattedDate: "",
      menu: false,
    };
  },
  created() {
    this.selectedDate = this.date ?? this.selectedDate;
    this.updateFormattedDate(this.date ?? this.selectedDate);
  },
  updated() {
    this.updateFormattedDate(this.date ?? this.selectedDate);
  },
  methods: {
    updateFormattedDate(dateToFormat: Date) {
      this.formattedDate = format(dateToFormat, this.format);
    },
    cancel() {
      this.menu = false;
    },
    confirm() {
      this.$emit("onSelectDate", this.selectedDate);
      this.updateFormattedDate(this.selectedDate);
      this.menu = false;
    },
  },
});
</script>
