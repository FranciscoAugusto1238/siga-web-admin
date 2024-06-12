<template>
    <a-container title="Listar Professores">
      <v-form ref="form" lazy-validation color="transparent">
        <v-row align="center">
          <v-col class="pr-2">
            <v-text-field v-model="filtroProfessor.nomeProfessor" label="Nome completo" />
          </v-col>
          <v-col class="pr-2">
            <v-text-field v-model="filtroProfessor.especialidadeProfessor" label="Especialidade" />
          </v-col>
          <v-col class="pr-2">
            <v-text-field v-model="filtroProfessor.outrosAtributosProfessor" label="Outros Atributos" />
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
            :server-items-length="totalProfessores"
            :headers="headers"
            :items="professores"
            :items-per-page="pagination.rowsPerPage"
            v-model:options="pagination"
            :actionButtons="{ excluir: true, editar: true }"
            @delete="excluirProfessor"
            @editar="editarProfessor"
          />
        </v-col>
      </v-row>
    </a-container>
  </template>
  
  <script>
  import { exibirMensagemErroApi, exibirMensagemSucesso } from "@/util/MessageUtils.js";
  import ProfessorService from "@/service/ProfessorService.js";
  
  const FILTROS_DEFAULT = {
    nomeProfessor: null,
    especialidadeProfessor: null,
    outrosAtributosProfessor: null,
  };
  
  export default {
    name: "ListarProfessores",
    data() {
      return {
        filtroProfessor: FILTROS_DEFAULT,
        pagination: {
          rowsPerPage: 10,
          page: 1,
          rowsNumber: 0,
        },
        totalProfessores: null,
        headers: [
          { text: "Nome", align: "start", sortable: true, value: "nomeProfessor" },
          { text: "Especialidade", align: "start", sortable: true, value: "especialidadeProfessor" },
          { text: "Outros Atributos", align: "start", sortable: true, value: "outrosAtributosProfessor" },
        ],
        professores: [],
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
        ProfessorService.listar({
          nomeProfessor: this.filtroProfessor.nomeProfessor,
          especialidadeProfessor: this.filtroProfessor.especialidadeProfessor,
          outrosAtributosProfessor: this.filtroProfessor.outrosAtributosProfessor,
          page: this.pagination.page - 1,
          size: this.pagination.rowsPerPage,
        })
        .then(({ data }) => {
          this.professores = data;
          this.totalProfessores = data.length;
        })
        .catch((error) => {
          exibirMensagemErroApi(error.response?.data, "Erro ao carregar professores. Tente novamente mais tarde.");
        });
      },
      limparFiltro() {
        this.filtroProfessor = { ...FILTROS_DEFAULT };
      },
      excluirProfessor(item) {
        ProfessorService.deletarProfessor(item.id)
        .then(() => {
          exibirMensagemSucesso("Professor excluído com sucesso!");
          this.listar();
        })
        .catch((error) => {
          exibirMensagemErroApi(error.response?.data, "Erro ao excluir professor. Tente novamente mais tarde.");
        });
      },
      editarProfessor(item) {
        this.$router.push({ name: 'CadastroProfessor', params: { id: item.id } });
      },
    },
  };
  </script>
  