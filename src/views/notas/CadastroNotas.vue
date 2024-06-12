<template>
  <a-container title="Cadastro de Notas">
    <v-form ref="form" lazy-validation color="transparent">
      <v-row align="center">
        <v-col>
          <v-select
            label="Matrícula"
            :items="matricula.map(matricula => matricula.outrosAtributosMatricula)"
            v-model="notas.matriculas"
          />
          <v-text-field v-model="notas.notaAluno" label="Nota" v-mask="'##'" />
          <v-text-field v-model="notas.outrosAtributosNota" label="Outros Atributos" /> 
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
import * as matriculaService from "@/service/MatriculaService";
import * as notaService from "@/service/NotaService";
import {exibirMensagemErroApi, exibirMensagemSucesso} from "@/util/MessageUtils.js";

export default {
  name: "CadastroNotas",
  data() {
    return {
      matricula: [],
      notas: {
        matriculas: null, 
        outrosAtributosNota: "",
        notaAluno: "",
      },
      buttonLoading: false,
    };
  },
  mounted() {
    this.listarMatriculas();
  },
  methods: {
    listarMatriculas() {
      matriculaService.default
        .listar()
        .then(({ data }) => {
          this.matricula = data;
        })
        .catch((error) => {
          exibirMensagemErroApi(error?.response?.data, "Erro ao listar matrículas");
          console.log(error);
        });
    },
    salvar() {
      this.buttonLoading = true;
      notaService.default
        .cadastrarNota(this.notas)
        .then(() => {
          exibirMensagemSucesso("Nota cadastrada com sucesso!");
          this.resetForm();
        })
        .catch((error) => {
          exibirMensagemErroApi(error?.response?.data, "Erro ao cadastrar nota");
          console.log(error);
        })
        .finally(() => {
          this.buttonLoading = false;
        });
    },
    resetForm() {
      this.notas.matricula = null;
      this.notas.outrosAtributosNota = "";
      this.notas.nota = "";
    },
  },
};
</script>
