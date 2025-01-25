<template>
  <section id="signup">
    <v-row justify="end">
      <v-col lg="5" md="5" sm="12">
        <v-row>
          <v-col cols="12" class="pt-15 pb-0 text-center">
            <img src="../../assets/logo.png" alt="" />
          </v-col>
          <v-col cols="12" class="pt-10 pb-15 pl-15 pr-15">
            <Form @submit="onSubmit" :validation-schema="schema">
              <div>
                <Field name="name" v-slot="{ field, errors }">
                  <label for="name">Qual o seu nome?</label>
                  <v-text-field
                    id="name"
                    name="name"
                    v-bind="field"
                    autofocus
                    required
                    :disabled="isSubmitting"
                    type="text"
                    variant="outlined"
                    append-inner-icon="mdi-account"
                    :error-messages="errors"
                  />
                </Field>
              </div>
              <div>
                <Field name="email" v-slot="{ field, errors }">
                  <label for="email">Qual o seu e-mail?</label>
                  <v-text-field
                    id="email"
                    name="email"
                    v-bind="field"
                    autofocus
                    required
                    :disabled="isSubmitting"
                    type="email"
                    variant="outlined"
                    append-inner-icon="mdi-email"
                    :error-messages="errors"
                  />
                </Field>
              </div>
              <div>
                <Field name="password" v-slot="{ field, errors }">
                  <label for="password">Qual a sua senha?</label>
                  <v-text-field
                    id="password"
                    v-bind="field"
                    required
                    :type="!showPassword ? 'password' : 'text'"
                    :disabled="isSubmitting"
                    variant="outlined"
                    :error-messages="errors"
                    :append-inner-icon="
                      !showPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    @click:append-inner="showPassword = !showPassword"
                  />
                </Field>
              </div>
              <div class="mt-5">
                <v-btn
                  prepend-icon="mdi-login"
                  block
                  :disabled="isSubmitting"
                  class="text-none"
                  color="#009efb"
                  size="x-large"
                  type="submit"
                  :loading="isSubmitting"
                >
                  Cadastrar
                </v-btn>
              </div>
              <div class="mt-5 mb-5 text-center">Ou</div>
              <div>
                <v-btn
                  variant="tonal"
                  block
                  :disabled="isSubmitting"
                  class="text-none"
                  color="#009efb"
                  size="x-large"
                  @click="this.$store.dispatch('login/changeType', 'login')"
                >
                  Login
                </v-btn>
              </div>
            </Form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import * as yup from "yup";
import { Form, Field } from "vee-validate";

export default {
  components: {
    Form,
    Field,
  },
  data() {
    return {
      showPassword: false,
    };
  },
  methods: {
    ...mapActions(["login/changeType", "login/signup"]),
    onSubmit(values) {
      this.$store.dispatch("login/signup", values);
    },
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.login.isSubmitting,
    }),
    schema() {
      return yup.object({
        name: yup
          .string()
          .required("O nome é obrigatório")
          .min(3, "O nome deve ter no mínimo 3 caracteres")
          .max(255, "O nome deve ter no máximo 255 caracteres"),
        email: yup
          .string()
          .required("O e-mail é obrigatório")
          .email("E-mail inválido")
          .max(255, "O e-mail deve ter no máximo 16 caracteres"),
        password: yup
          .string()
          .required("A senha é obrigatória")
          .min(8, "A senha deve ter pelo menos 8 caracteres")
          .max(16, "A senha deve ter no máximo 16 caracteres"),
      });
    },
  },
};
</script>

<style lang="scss">
#signup {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  background-image: url("../../assets/images/login.jpg");
  background-position: right 21vw center;
  background-size: cover;

  & > div {
    & > div {
      height: 100%;
      background-color: white;
    }
  }

  & img {
    display: inline-block;
    width: 100%;
    max-width: 250px;
  }
}

body,
html {
  height: 100vh;
  min-height: 300px;
}

#app {
  height: 100vh;
}
</style>
