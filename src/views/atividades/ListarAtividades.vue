<template>
    <a-container title="Listar Atividades">
      <v-form ref="form" lazy-validation color="transparent">
        <v-row align="center">
          <v-col>
            <v-text-field 
              label="Disciplina"
              v-model="filtroAtividade.disciplina"
            />
            <v-text-field v-model="filtroAtividade.dataEntrega" label="Data de Entrega da Atividade" v-mask="'##-##-####'" />
          </v-col>
          <v-col>
            <v-text-field v-model="filtroAtividade.descricaoAtividade" label="Descrição da Atividade"/>
            <v-text-field v-model="filtroAtividade.outrosAtributosAtividade" label="Outros Atributos" /> 
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
            :server-items-length="totalAtividades"
            :headers="headers"
            :items="atividades"
            :items-per-page="pagination.rowsPerPage"
            v-model:options="pagination"
            :actionButtons="{ excluir: true }"
            @delete="excluirAtividade"
          />
        </v-col>
      </v-row>
    </a-container>
  </template>
  
  <script>
  import { exibirMensagemErroApi, exibirMensagemSucesso } from "@/util/MessageUtils.js";
  import AtividadeService from "@/service/AtividadeService.js";
  
  const FILTROS_DEFAULT = {
    disciplina: null,
    descricaoAtividade: null,
    outrosAtributosAtividade: null,
    dataEntrega: null,
  };
  
  export default {
    name: "ListarAtividades",
    data() {
      return {
        filtroAtividade: FILTROS_DEFAULT,
        pagination: {
          rowsPerPage: 10,
          page: 1,
          rowsNumber: 0,
        },
        totalAtividades: null,
        headers: [
          { text: "Disciplina", align: "start", sortable: true, value: "disciplina" },
          { text: "Descrição", align: "start", sortable: true, value: "descricaoAtividade" },
          { text: "Data de Entrega", align: "start", sortable: true, value: "dataEntrega" },
          { text: "Outros Atributos", align: "start", sortable: true, value: "outrosAtributosAtividade" },
        ],
        atividades: [],
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
        AtividadeService.listar({
          disciplina: this.filtroAtividade.disciplina,
          descricaoAtividade: this.filtroAtividade.descricaoAtividade,
          outrosAtributosAtividade: this.filtroAtividade.outrosAtributosAtividade,
          dataEntrega: this.filtroAtividade.dataEntrega,
          page: this.pagination.page - 1,
          size: this.pagination.rowsPerPage,
        })
        .then(({ data }) => {
          this.atividades = data;
          this.totalAtividades = data.length;
        })
        .catch((error) => {
          exibirMensagemErroApi(error.response?.data, "Erro ao carregar atividades. Tente novamente mais tarde.");
        });
      },
      limparFiltro() {
        this.filtroAtividade = { ...FILTROS_DEFAULT };
      },
      excluirAtividade(item) {
        AtividadeService.deletarAtividade(item.id)
        .then(() => {
          exibirMensagemSucesso("Atividade excluída com sucesso!");
          this.listar();
        })
        .catch((error) => {
          exibirMensagemErroApi(error.response?.data, "Erro ao excluir atividade. Tente novamente mais tarde.");
        });
      },
    },
  };
  </script>
  