<template>
    <a-container title="Listar Notas">
      <v-form ref="form" lazy-validation color="transparent">
        <v-row align="center">
          <v-col>
            <v-text-field label="Matrícula" v-model="filtroNota.matricula"/>
            <v-text-field v-model="filtroNota.notaAluno" label="Nota" v-mask="'##'" />
            <v-text-field v-model="filtroNota.outrosAtributosNota" label="Outros Atributos" /> 
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
            :server-items-length="totalNotas"
            :headers="headers"
            :items="notas"
            :items-per-page="pagination.rowsPerPage"
            v-model:options="pagination"
            :actionButtons="{ excluir: true }"
            @delete="excluirNota"
          />
        </v-col>
      </v-row>
    </a-container>
  </template>
  
  <script>
  import { exibirMensagemErroApi, exibirMensagemSucesso } from "@/util/MessageUtils.js";
  import NotaService from "@/service/NotaService.js";
  
  const FILTROS_DEFAULT = {
    matricula: null,
    notaAluno: null,
    outrosAtributosNota: null,
  };
  
  export default {
    name: "ListarNotas",
    data() {
      return {
        filtroNota: FILTROS_DEFAULT,
        pagination: {
          rowsPerPage: 10,
          page: 1,
          rowsNumber: 0,
        },
        totalNotas: null,
        headers: [
          { text: "Matrícula", align: "start", sortable: true, value: "id" },
          { text: "Nota", align: "start", sortable: true, value: "notaAluno" },
          { text: "Outros Atributos", align: "start", sortable: true, value: "outrosAtributosNota" },
        ],
        notas: [],
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
        NotaService.listar({
          matricula: this.filtroNota.matricula,
          notaAluno: this.filtroNota.notaAluno,
          outrosAtributosNota: this.filtroNota.outrosAtributosNota,
          page: this.pagination.page - 1,
          size: this.pagination.rowsPerPage,
        })
        .then(({ data }) => {
          this.notas = data;
          this.totalNotas = data.length;
        })
        .catch((error) => {
          exibirMensagemErroApi(error.response?.data, "Erro ao carregar notas. Tente novamente mais tarde.");
        });
      },
      limparFiltro() {
        this.filtroNota = { ...FILTROS_DEFAULT };
      },
      excluirNota(item) {
        NotaService.deletarNota(item.id)
        .then(() => {
          exibirMensagemSucesso("Nota excluída com sucesso!");
          this.listar();
        })
        .catch((error) => {
          exibirMensagemErroApi(error.response?.data, "Erro ao excluir nota. Tente novamente mais tarde.");
        });
      },
    },
  };
  </script>
  