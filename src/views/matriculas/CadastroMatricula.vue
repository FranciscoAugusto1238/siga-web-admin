<template>
  <a-container title="Cadastro de Matrícula">
    <v-form ref="form" lazy-validation color="transparent">
      <v-row align="center">
        <v-col>
          <v-select
            label="Disciplina"
            :items="disciplina.map(disciplina => disciplina.nomeDisciplina)"
            v-model="matricula.disciplina"
          />
          <v-text-field v-model="matricula.anoMatricula" label="Ano da Matrícula" v-mask="'####'" />
        </v-col>
        <v-col>
          <v-select
            label="Aluno"
            :items="aluno.map(aluno => aluno.nomeAluno)"
            v-model="matricula.aluno"
          />
          <v-text-field v-model="matricula.outrosAtributosMatricula" label="Outros Atributos" /> 
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
import * as disciplinaService from "@/service/DisciplinaService";
import * as alunoService from "@/service/AlunoService";
import * as matriculaService from "@/service/MatriculaService";
import {exibirMensagemErroApi, exibirMensagemSucesso} from "@/util/MessageUtils.js";

export default {
  name: "CadastroMatricula",
  data() {
    return {
      disciplina: [],
      aluno: [],
      matricula: {
        disciplina: null, 
        aluno: null, 
        outrosAtributosMatricula: "",
        anoMatricula: "",
      },
      buttonLoading: false,
    };
  },
  mounted() {
    this.listarDisciplinas();
    this.listarAlunos();
  },
  methods: {
    listarDisciplinas() {
      disciplinaService.default
        .listar()
        .then(({ data }) => {
          this.disciplina = data;
        })
        .catch((error) => {
          exibirMensagemErroApi(error?.response?.data, "Erro ao listar disciplinas");
          console.log(error);
        });
    },
    listarAlunos() {
      alunoService.default
        .listar()
        .then(({ data }) => {
          this.aluno = data;
        })
        .catch((error) => {
          exibirMensagemErroApi(error?.response?.data, "Erro ao listar alunos");
          console.log(error);
        });
    },
    salvar() {
      this.buttonLoading = true;
      matriculaService.default
        .salvarMatricula(this.matricula)
        .then(() => {
          exibirMensagemSucesso("Matrícula cadastrada com sucesso!");
          this.resetForm();
        })
        .catch((error) => {
          exibirMensagemErroApi(error?.response?.data, "Erro ao cadastrar matrícula");
          console.log(error);
        })
        .finally(() => {
          this.buttonLoading = false;
        });
    },
    resetForm() {
      this.matricula.disciplina = null;
      this.matricula.aluno = null;
      this.matricula.outrosAtributosMatricula = "";
      this.matricula.anoMatricula = "";
    },
  },
};
</script>
