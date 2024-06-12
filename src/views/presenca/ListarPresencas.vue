<template>
    <a-container title="Listar Presenças">
      <v-form ref="form" lazy-validation color="transparent">
        <v-row align="center">
          <v-col>
            <v-text-field
              label="Aula"
              v-model="filtroPresenca.aula"
            />
            <v-text-field v-model="filtroPresenca.presenca" label="Presença" />
          </v-col>
          <v-col>
            <v-text-field
              label="Aluno"
              v-model="filtroPresenca.aluno"
            />
            <v-text-field
              v-model="filtroPresenca.outrosAtributosPresenca"
              label="Outros Atributos"
            />
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
            :server-items-length="totalPresencas"
            :headers="headers"
            :items="presencas"
            :items-per-page="pagination.rowsPerPage"
            v-model:options="pagination"
            :actionButtons="{ excluir: true }"
            @delete="excluirPresenca"
          />
        </v-col>
      </v-row>
    </a-container>
  </template>
  
  <script>
  import { exibirMensagemErroApi, exibirMensagemSucesso } from "@/util/MessageUtils.js";
  import PresencaService from "@/service/PresencaService.js";
  
  const FILTROS_DEFAULT = {
    aula: null,
    aluno: null,
    outrosAtributosPresenca: null,
    presenca: null,
  };
  
  export default {
    name: "ListarPresencas",
    data() {
      return {
        filtroPresenca: FILTROS_DEFAULT,
        pagination: {
          rowsPerPage: 10,
          page: 1,
          rowsNumber: 0,
        },
        totalPresencas: null,
        headers: [
          { text: "Aula", align: "start", sortable: true, value: "aula" },
          { text: "Aluno", align: "start", sortable: true, value: "aluno" },
          { text: "Presença", align: "start", sortable: true, value: "presenca" },
          { text: "Outros Atributos", align: "start", sortable: true, value: "outrosAtributosPresenca" },
        ],
        presencas: [],
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
        PresencaService.listar({
          aula: this.filtroPresenca.aula,
          aluno: this.filtroPresenca.aluno,
          outrosAtributosPresenca: this.filtroPresenca.outrosAtributosPresenca,
          presenca: this.filtroPresenca.presenca,
          page: this.pagination.page - 1,
          size: this.pagination.rowsPerPage,
        })
        .then(({ data }) => {
          this.presencas = data;
          this.totalPresencas = data.length;
        })
        .catch((error) => {
          exibirMensagemErroApi(error.response?.data, "Erro ao carregar presenças. Tente novamente mais tarde.");
        });
      },
      limparFiltro() {
        this.filtroPresenca = { ...FILTROS_DEFAULT };
      },
      excluirPresenca(item) {
        PresencaService.deletarPresenca(item.id)
        .then(() => {
          exibirMensagemSucesso("Presença excluída com sucesso!");
          this.listar();
        })
        .catch((error) => {
          exibirMensagemErroApi(error.response?.data, "Erro ao excluir presença. Tente novamente mais tarde.");
        });
      },
    },
  };
  </script>
  