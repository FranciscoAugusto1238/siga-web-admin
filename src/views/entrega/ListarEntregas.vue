<template>
    <a-container title="Listar Entregas de Atividades">
      <v-form ref="form" lazy-validation color="transparent">
        <v-row align="center">
          <v-col>
            <v-text-field 
              label="Atividade"
              v-model="filtroEntrega.atividade"
            />
            <v-text-field v-model="filtroEntrega.dataEntrega" label="Data de Entrega" v-mask="'##-##-####'" />
          </v-col>
          <v-col>
            <v-text-field 
              label="Aluno"
              v-model="filtroEntrega.aluno"
            />          
            <v-text-field v-model="filtroEntrega.outrosAtributosEntrega" label="Outros Atributos" /> 
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
            :server-items-length="totalEntregas"
            :headers="headers"
            :items="entregas"
            :items-per-page="pagination.rowsPerPage"
            v-model:options="pagination"
            :actionButtons="{ excluir: true }"
            @delete="excluirEntrega"
          />
        </v-col>
      </v-row>
    </a-container>
  </template>
  
  <script>
  import { exibirMensagemErroApi, exibirMensagemSucesso } from "@/util/MessageUtils.js";
  import EntregaService from "@/service/EntregaService.js";
  
  const FILTROS_DEFAULT = {
    atividade: null,
    aluno: null,
    outrosAtributosEntrega: null,
    dataEntrega: null,
  };
  
  export default {
    name: "ListarEntregas",
    data() {
      return {
        filtroEntrega: FILTROS_DEFAULT,
        pagination: {
          rowsPerPage: 10,
          page: 1,
          rowsNumber: 0,
        },
        totalEntregas: null,
        headers: [
          { text: "Atividade", align: "start", sortable: true, value: "notas" },
          { text: "Aluno", align: "start", sortable: true, value: "aluno" },
          { text: "Data de Entrega", align: "start", sortable: true, value: "dataEntrega" },
          { text: "Outros Atributos", align: "start", sortable: true, value: "outrosAtributosEntrega" },
        ],
        entregas: [],
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
        EntregaService.listar({
          atividade: this.filtroEntrega.atividade,
          aluno: this.filtroEntrega.aluno,
          outrosAtributosEntrega: this.filtroEntrega.outrosAtributosEntrega,
          dataEntrega: this.filtroEntrega.dataEntrega,
          page: this.pagination.page - 1,
          size: this.pagination.rowsPerPage,
        })
        .then(({ data }) => {
          this.entregas = data;
          this.totalEntregas = data.length;
        })
        .catch((error) => {
          exibirMensagemErroApi(error.response?.data, "Erro ao carregar entregas. Tente novamente mais tarde.");
        });
      },
      limparFiltro() {
        this.filtroEntrega = { ...FILTROS_DEFAULT };
      },
      excluirEntrega(item) {
        EntregaService.deletarEntrega(item.id)
        .then(() => {
          exibirMensagemSucesso("Entrega excluída com sucesso!");
          this.listar();
        })
        .catch((error) => {
          exibirMensagemErroApi(error.response?.data, "Erro ao excluir entrega. Tente novamente mais tarde.");
        });
      },
    },
  };
  </script>
  