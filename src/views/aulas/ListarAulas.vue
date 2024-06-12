<template>
    <a-container title="Listar Aulas">
      <v-form ref="form" lazy-validation color="transparent">
        <v-row align="center">
          <v-col class="pr-2">
            <v-text-field v-model="filtroAula.disciplina" label="Disciplina" />
          </v-col>
          <v-col class="pr-2">
            <v-text-field v-model="filtroAula.professor" label="Professor" />
          </v-col>
          <v-col class="pr-2">
            <v-text-field v-model="filtroAula.salaDeAula" label="Sala" />
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
            :server-items-length="totalAulas"
            :headers="headers"
            :items="aulas"
            :items-per-page="pagination.rowsPerPage"
            v-model:options="pagination"
            :actionButtons="{ excluir: true, editar: true }"
            @delete="excluirAula"
            @editar="editarAula"
          />
        </v-col>
      </v-row>
    </a-container>
  </template>
  
  <script>
  import { exibirMensagemErroApi, exibirMensagemSucesso } from "@/util/MessageUtils.js";
  import AulaService from "@/service/AulaService.js";
  
  const FILTROS_DEFAULT = {
    disciplina: null,
    professor: null,
    salaDeAula: null,
  };
  
  export default {
    name: "ListarAulas",
    data() {
      return {
        filtroAula: FILTROS_DEFAULT,
        pagination: {
          rowsPerPage: 10,
          page: 1,
          rowsNumber: 0,
        },
        totalAulas: null,
        headers: [
          { text: "Disciplina", align: "start", sortable: true, value: "disciplina" },
          { text: "Professor", align: "start", sortable: true, value: "professor" },
          { text: "Sala", align: "start", sortable: true, value: "salaDeAula" },
          { text: "Horário", align: "start", sortable: true, value: "horarioAula" },
          { text: "Outros Atributos", align: "start", sortable: true, value: "outrosAtributosAula" },
        ],
        aulas: [],
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
        AulaService.listar({
          disciplina: this.filtroAula.disciplina,
          professor: this.filtroAula.professor,
          salaDeAula: this.filtroAula.salaDeAula,
          page: this.pagination.page - 1,
          size: this.pagination.rowsPerPage,
        })
        .then(({ data }) => {
          this.aulas = data;
          this.totalAulas = data.length;
        })
        .catch((error) => {
          exibirMensagemErroApi(error.response?.data, "Erro ao carregar aulas. Tente novamente mais tarde.");
        });
      },
      limparFiltro() {
        this.filtroAula = { ...FILTROS_DEFAULT };
      },
      excluirAula(item) {
        AulaService.deletarAula(item.id)
        .then(() => {
          exibirMensagemSucesso("Aula excluída com sucesso!");
          this.listar();
        })
        .catch((error) => {
          exibirMensagemErroApi(error.response?.data, "Erro ao excluir aula. Tente novamente mais tarde.");
        });
      },
      editarAula(item) {
        this.$router.push({ name: 'CadastroAula', params: { id: item.id } });
      },
    },
  };
  </script>
  