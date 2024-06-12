<template>
  <a-container title="Cadastro de Salas de Aula">
    <v-form ref="form" lazy-validation color="transparent">
      <h2 class="mb-4" style="margin-left: 0;">Dados da sala</h2>
      <v-row align="center">
        <v-col>
          <v-text-field v-model="sala.nomeSala" label="Nome completo" />
        </v-col>
        <v-col>
          <v-text-field label="Capacidade" v-model="sala.capacidadeSala"/>			
        </v-col>
        <v-col>
          <v-text-field v-model="sala.outrosAtributosSala" label="Outros Atributos" />
        </v-col>
      </v-row>
    </v-form>

    <v-container>
      <v-row justify="end">
        <v-col cols="auto">
          <a-btn
            buttonName="Salvar"
            v-on:click="salvar"
            :needIcon="true"
            style="background-color: gray; color: white"
            :needLoading="buttonLoading"
          />
        </v-col>
      </v-row>
    </v-container>
  </a-container>
</template>

<script>
import SalaService from "@/service/SalaService";
import { exibirMensagemErroApi, exibirMensagemSucesso } from "@/util/MessageUtils.js";

export default {
  name: "CadastroSala",
  data() {
    return {
      sala: this.newSala(),
      buttonLoading: false,
      isEditar: false,
    };
  },
  mounted() {
    if (this.$route.params?.id) {
      this.isEditar = true;
      this.buscarSala();
    }
  },
  methods: {
    newSala() {
      return {
        nomeSala: "",
        capacidadeSala: "",
        outrosAtributosSala: "",
      };
    },
    buscarSala() {
      SalaService.buscarSala(this.$route.params.id)
        .then((response) => {
          this.sala = response.data;
        })
        .catch((error) => {
          exibirMensagemErroApi(
            error?.response?.data,
            "Não foi possível buscar a sala! Tente novamente mais tarde."
          );
          console.error(error);
        });
    },
    salvar() {
      this.buttonLoading = true;
      if (this.isEditar) {
        this.atualizarSala();
      } else {
        this.cadastrarSala();
      }
    },
    cadastrarSala() {
      SalaService.cadastrarSala(this.sala)
        .then(() => {
          this.buttonLoading = false;
          exibirMensagemSucesso("Sala cadastrada com sucesso!");
          this.$router.push("/cadastro-salas");
        })
        .catch((error) => {
          this.buttonLoading = false;
          exibirMensagemErroApi(
            error?.response?.data,
            "Erro ao cadastrar sala! Tente novamente mais tarde."
          );
        });
    },
    atualizarSala() {
      SalaService.atualizarSala(this.$route.params.id, this.sala)
        .then(() => {
          this.buttonLoading = false;
          exibirMensagemSucesso("Sala atualizada com sucesso!");
        })
        .catch((error) => {
          this.buttonLoading = false;
          exibirMensagemErroApi(
            error?.response?.data,
            "Erro ao atualizar sala! Tente novamente mais tarde."
          );
        });
    },
  },
};
</script>
