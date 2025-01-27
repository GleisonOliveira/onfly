<template>
  <MainComponent>
    <section>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" class="text-center">
            <p class="text-blue text-h6">SOBRE</p>
          </v-col>
          <v-col cols="12" class="text-center">
            <h1>O que é a <span class="text-blue">Onfly?</span></h1>
          </v-col>
          <v-col cols="5" class="text-center">
            <p>
              A plataforma nº1 da América Latina na gestão de viagens a
              trabalho, com foco em transparência, economia e na experiência
              descomplicada do viajante.
            </p>
          </v-col>
        </v-row>
        <v-row align="stretch" justify="center">
          <v-col cols="12" sm="6" md="6" lg="4" class="d-flex">
            <div class="bg-indigo-lighten-5 pl-3 pr-3 pb-3 pt-3 rounded-lg">
              <v-row class="text-blue font-weight-bold">
                <v-col cols="2"
                  ><v-icon icon="mdi-bag-personal"></v-icon
                ></v-col>
                <v-col cols="10">Para o Viajante</v-col>
              </v-row>
              <v-row class="font-weight-bold">
                <v-col cols="12"
                  >Suas viagens a trabalho podem ser mais simples</v-col
                >
              </v-row>
              <v-row>
                <v-col cols="12" class="text-subtitle-2"
                  >Reserve tudo em poucos cliques, sem precisar fazer nenhuma
                  solicitação externa: é você quem decide o melhor horário para
                  as suas viagens.</v-col
                >
              </v-row>
              <v-row>
                <v-col cols="12" class="text-subtitle-2"
                  ><div
                    class="bg-indigo-lighten-4 rounded-lg pt-5 pb-5 pl-5 pr-5"
                  >
                    <img
                      class="images"
                      src="https://www.onfly.com.br/wp-content/uploads/2024/06/card-viagem-1.png"
                      alt="Benefícios para o viajante"
                    />
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="4" class="d-flex">
            <div class="bg-indigo-lighten-5 pl-3 pr-3 pb-3 pt-3 rounded-lg">
              <v-row class="text-blue font-weight-bold">
                <v-col cols="2"><v-icon icon="mdi-chart-arc"></v-icon></v-col>
                <v-col cols="10">Para a Gestão de Viagens</v-col>
              </v-row>
              <v-row class="font-weight-bold">
                <v-col cols="12"
                  >Eficiência e qualidade em viagens corporativas</v-col
                >
              </v-row>
              <v-row>
                <v-col cols="12" class="text-subtitle-2"
                  >Otimize o gerenciamento de viagens com a Onfly: acompanhe em
                  tempo real, controle créditos e gerencie políticas e bilhetes
                  não voados. Diminua a quantidade de processos e foque no
                  essencial.</v-col
                >
              </v-row>
              <v-row>
                <v-col cols="12" class="text-subtitle-2"
                  ><div
                    class="bg-indigo-lighten-4 rounded-lg pt-5 pb-5 pl-5 pr-5"
                  >
                    <img
                      class="images"
                      src="https://www.onfly.com.br/wp-content/uploads/2024/05/despesas.png"
                      alt="Benefícios para os gestores de viagens"
                    />
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="4" class="d-flex">
            <div class="bg-indigo-lighten-5 pl-3 pr-3 pb-3 pt-3 rounded-lg">
              <v-row class="text-blue font-weight-bold">
                <v-col cols="2"><v-icon icon="mdi-hand-coin"></v-icon></v-col>
                <v-col cols="10">Para a Gestão Financeira</v-col>
              </v-row>
              <v-row class="font-weight-bold">
                <v-col cols="12"
                  >Transparência Financeira é com a líder da América
                  Latina</v-col
                >
              </v-row>
              <v-row>
                <v-col cols="12" class="text-subtitle-2"
                  >Otimize o gerenciamento de viagens com a Onfly: acompanhe em
                  tempo real, controle créditos e gerencie políticas e bilhetes
                  não voados. Diminua a quantidade de processos e foque no
                  essencial.</v-col
                >
              </v-row>
              <v-row>
                <v-col cols="12" class="text-subtitle-2"
                  ><div
                    class="bg-indigo-lighten-4 rounded-lg pt-5 pb-5 pl-5 pr-5"
                  >
                    <img
                      class="images"
                      src="https://www.onfly.com.br/wp-content/uploads/2024/06/relatorio-de-viagem-onfly-1.png"
                      alt="Benefícios para a gestão financeira"
                    />
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </MainComponent>
</template>

<style lang="scss" scoped>
.images {
  display: block;
  width: 100%;
}
</style>
<script lang="ts">
import { defineComponent } from "vue";
import MainComponent from "@/components/main/MainComponent.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    MainComponent,
  },
});
</script>
