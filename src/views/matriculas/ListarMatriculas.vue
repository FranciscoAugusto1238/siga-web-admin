<template>
    <a-container title="Listar Matrículas">
      <v-form ref="form" lazy-validation color="transparent">
        <v-row align="center">
          <v-col>
            <v-text-field
              v-model="filtroMatricula.disciplina"
              label="Disciplina"
            />
            <v-text-field v-model="filtroMatricula.anoMatricula" label="Ano da Matrícula" v-mask="'####'" />
          </v-col>
          <v-col>
            <v-text-field
              v-model="filtroMatricula.aluno"
              label="Aluno"
            />
            <v-text-field v-model="filtroMatricula.outrosAtributosMatricula" label="Outros Atributos" /> 
          </v-col>
        </v-row>
      </v-form>
      <v-row justify="space-between">
        <v-col cols="auto">
          <a-btn buttonName="Limpar filtro" @click="limparFiltro()" style="background-color: gray; color: white"/>
        </v-col>
        <v-col cols="auto">
          <a-btn buttonName="Buscar" style="background-color: gray; color: white" buttonIcon="mdi-text-search-variant" @click="listar()" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <tabela-exibicao
            :server-items-length="totalMatriculas"
            :headers="headers"
            :items="matriculas"
            :items-per-page="pagination.rowsPerPage"
            v-model:options="pagination"
            :actionButtons="{ excluir: true }"
            @delete="excluirMatricula"
          />
        </v-col>
      </v-row>
    </a-container>
  </template>
  
  <script>
  import { exibirMensagemErroApi, exibirMensagemSucesso } from "@/util/MessageUtils.js";
  import MatriculaService from "@/service/MatriculaService.js";
  
  const FILTROS_DEFAULT = {
    disciplina: null,
    aluno: null,
    outrosAtributosMatricula: null,
    anoMatricula: null,
  };
  
  export default {
    name: "ListarMatriculas",
    data() {
      return {
        disciplinas: [],
        alunos: [],
        matriculas: [],
        filtroMatricula: FILTROS_DEFAULT,
        pagination: {
          rowsPerPage: 10,
          page: 1,
          rowsNumber: 0,
        },
        totalMatriculas: null,
        headers: [
          { text: "Disciplina", align: "start", sortable: true, value: "disciplina" },
          { text: "Aluno", align: "start", sortable: true, value: "aluno" },
          { text: "Ano Matrícula", align: "start", sortable: true, value: "anoMatricula" },
          { text: "Outros Atributos", align: "start", sortable: true, value: "outrosAtributosMatricula" },
        ],
      };
    },
    watch: {
      pagination: {
        handler() {
          this.listar();
        },
        deep: true,
      },
    },
    created() {
      this.listar();
    },
    methods: {
      listar() {
        MatriculaService.listar({
          disciplina: this.filtroMatricula.disciplina,
          aluno: this.filtroMatricula.aluno,
          outrosAtributosMatricula: this.filtroMatricula.outrosAtributosMatricula,
          anoMatricula: this.filtroMatricula.anoMatricula,
          page: this.pagination.page - 1,
          size: this.pagination.rowsPerPage,
        })
        .then(({ data }) => {
          this.matriculas = data;
          this.totalMatriculas = data.length;
        })
        .catch((error) => {
          exibirMensagemErroApi(error.response?.data, "Erro ao carregar matrículas. Tente novamente mais tarde.");
        });
      },
      limparFiltro() {
        this.filtroMatricula = { ...FILTROS_DEFAULT };
      },
      excluirMatricula(item) {
        MatriculaService.deletarMatricula(item.id)
        .then(() => {
          exibirMensagemSucesso("Matrícula excluída com sucesso!");
          this.listar();
        })
        .catch((error) => {
          exibirMensagemErroApi(error.response?.data, "Erro ao excluir matrícula. Tente novamente mais tarde.");
        });
      },
    },
  };
  </script>
  