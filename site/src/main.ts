import { createApp } from "vue";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { VDateInput } from "vuetify/labs/VDateInput";
import { VTimePicker } from "vuetify/labs/VTimePicker";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { pt } from "vuetify/locale";
import "@mdi/font/css/materialdesignicons.css";
import "./assets/css/base.scss";

const vuetify = createVuetify({
  locale: {
    locale: "pt",
    messages: { pt },
  },
  components: {
    ...components,
    VDateInput,
    VTimePicker,
  },
  directives,
});

createApp(App).use(store).use(router).use(vuetify).mount("#app");
