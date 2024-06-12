<template>
  <a-container title="Cadastro de Presença">
    <v-form ref="form" lazy-validation color="transparent">
      <v-row align="center">
        <v-col>
          <v-select
            label="Aula"
            :items="aula.map(aula => aula.disciplina)"
            v-model="presenca.aula"
          />
          <v-text-field v-model="presenca.presenca" label="Presença" />        </v-col>
        <v-col>
          <v-select
            label="Aluno"
            :items="aluno.map(aluno => aluno.nomeAluno)"
            v-model="presenca.aluno"
          />
          <v-text-field
            v-model="presenca.outrosAtributosPresenca"
            label="Outros Atributos"
          />
        </v-col>
      </v-row>
    </v-form>
    <v-container>
      <v-row justify="center" class="bottom_salvar">
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
import * as PresencaService from "@/service/PresencaService";
import * as AlunoService from "@/service/AlunoService";
import * as AulaService from "@/service/AulaService";
import { exibirMensagemErroApi, exibirMensagemSucesso } from "@/util/MessageUtils.js";

export default {
  name: "CadastroPresenca",
  data() {
    return {
      aula: [],
      aluno: [],
      presenca: {
        aula: null,
        aluno: null,
        outrosAtributosPresenca: "",
        presenca: "",
      },
      buttonLoading: false,
    };
  },
  mounted() {
    if (this.isEditar) {
      this.listarPresenca();
    }
    this.listarAlunos();
    this.listarAulas();
  },
  computed: {
    isEditar() {
      return this.$route.params?.id;
    },
  },
  methods: {
    listarAlunos() {
      AlunoService.default
        .listar()
        .then(({ data }) => {
          this.aluno = data;
        })
        .catch((error) => {
          exibirMensagemErroApi(
            error?.response?.data,
            "Não foi possível listar os alunos! Tente novamente mais tarde."
          );
          console.error(error);
        });
    },
    listarAulas() {
      AulaService.default
        .listar()
        .then(({ data }) => {
          this.aula = data;
        })
        .catch((error) => {
          exibirMensagemErroApi(
            error?.response?.data,
            "Não foi possível listar as aulas! Tente novamente mais tarde."
          );
          console.error(error);
        });
    },
    listarPresenca() {
      PresencaService.default
        .buscarPresenca(this.$route.params.id)
        .then(({ data }) => {
          this.presenca = data;
        })
        .catch((error) => {
          exibirMensagemErroApi(
            error?.response?.data,
            "Não foi possível buscar a presença! Tente novamente mais tarde."
          );
          console.error(error);
        });
    },
    salvar() {
      PresencaService.default
        .cadastrarPresenca(this.presenca)
        .then(() => {
          this.buttonLoading = false;
          exibirMensagemSucesso("Presença cadastrada com sucesso!");
          this.$router.push("/cadastro-presenca");
        })
        .catch((error) => {
          this.buttonLoading = false;
          exibirMensagemErroApi(
            error?.response?.data,
            "Erro ao cadastrar presença! Tente novamente mais tarde."
          );
        });
    },
  },
};
</script>
