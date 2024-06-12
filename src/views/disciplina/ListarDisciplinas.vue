<template>
    <a-container title="Listar Disciplinas">
      <v-form ref="form" lazy-validation color="transparent">
        <v-row align="center">
          <v-col class="pr-2">
            <v-text-field v-model="filtroDisciplina.nomeDisciplina" label="Nome completo" />
          </v-col>
          <v-col class="pr-2">
            <v-text-field v-model="filtroDisciplina.descricaoDisciplina" label="Descrição da disciplina" />
          </v-col>
          <v-col class="pr-2">
            <v-text-field v-model="filtroDisciplina.outrosAtributosDisciplina" label="Outros Atributos" />
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
            :server-items-length="totalDisciplinas"
            :headers="headers"
            :items="disciplinas"
            :items-per-page="pagination.rowsPerPage"
            v-model:options="pagination"
            :actionButtons="{ excluir: true, editar: true }"
            @delete="excluirDisciplina"
            @editar="editarDisciplina"
          />
        </v-col>
      </v-row>
    </a-container>
  </template>
  
  <script>
  import { exibirMensagemErroApi, exibirMensagemSucesso } from "@/util/MessageUtils.js";
  import DisciplinaService from "@/service/DisciplinaService.js";
  
  const FILTROS_DEFAULT = {
    nomeDisciplina: null,
    descricaoDisciplina: null,
    outrosAtributosDisciplina: null,
  };
  
  export default {
    name: "ListarDisciplinas",
    data() {
      return {
        filtroDisciplina: FILTROS_DEFAULT,
        pagination: {
          rowsPerPage: 10,
          page: 1,
          rowsNumber: 0,
        },
        totalDisciplinas: null,
        headers: [
          { text: "Nome", align: "start", sortable: true, value: "nomeDisciplina" },
          { text: "Descrição", align: "start", sortable: true, value: "descricaoDisciplina" },
          { text: "Outros Atributos", align: "start", sortable: true, value: "outrosAtributosDisciplina" },
        ],
        disciplinas: [],
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
        DisciplinaService.listar({
          nomeDisciplina: this.filtroDisciplina.nomeDisciplina,
          descricaoDisciplina: this.filtroDisciplina.descricaoDisciplina,
          outrosAtributosDisciplina: this.filtroDisciplina.outrosAtributosDisciplina,
          page: this.pagination.page - 1,
          size: this.pagination.rowsPerPage,
        })
        .then(({ data }) => {
          this.disciplinas = data;
          this.totalDisciplinas = data.length;
        })
        .catch((error) => {
          exibirMensagemErroApi(error.response?.data, "Erro ao carregar disciplinas. Tente novamente mais tarde.");
        });
      },
      limparFiltro() {
        this.filtroDisciplina = { ...FILTROS_DEFAULT };
      },
      excluirDisciplina(item) {
        DisciplinaService.deletarDisciplina(item.id)
        .then(() => {
          exibirMensagemSucesso("Disciplina excluída com sucesso!");
          this.listar();
        })
        .catch((error) => {
          exibirMensagemErroApi(error.response?.data, "Erro ao excluir disciplina. Tente novamente mais tarde.");
        });
      },
      editarDisciplina(item) {
        this.$router.push({ name: 'CadastroDisciplina', params: { id: item.id } });
      },
    },
  };
  </script>
  