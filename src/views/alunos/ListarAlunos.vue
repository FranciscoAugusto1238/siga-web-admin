<template>
    <a-container title="Listar Alunos">
      <v-form ref="form" lazy-validation color="transparent">
        <v-row align="center">
          <v-col class="pr-2">
            <v-text-field v-model="filtroAluno.nomeAluno" label="Nome" />
          </v-col>
          <v-col class="pr-2">
            <v-text-field v-model="filtroAluno.dataNascimentoAluno" label="Data Nascimento" v-mask="'##-##-####'" />
          </v-col>
          <v-col class="pr-2">
            <v-text-field v-model="filtroAluno.outrosAtributosAluno" label="Outros Atributos" />
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
            :server-items-length="totalAlunos"
            :headers="headers"
            :items="alunos"
            :items-per-page="pagination.rowsPerPage"
            v-model:options="pagination"
            :actionButtons="{ excluir: true, editar: true }"
            @delete="excluirAluno"
            @editar="editarAluno"
          />
        </v-col>
      </v-row>
    </a-container>
  </template>
  
  <script>
  import { exibirMensagemErroApi, exibirMensagemSucesso } from "@/util/MessageUtils.js";
  import AlunoService from "@/service/AlunoService.js"; // Corrigindo a importação do serviço
  
  const FILTROS_DEFAULT = {
    nomeAluno: null,
    dataNascimentoAluno: null,
    outrosAtributosAluno: null,
  };
  
  export default {
    name: "ListarAlunos",
    data() {
      return {
        filtroAluno: FILTROS_DEFAULT,
        pagination: {
          rowsPerPage: 10,
          page: 1,
          rowsNumber: 0,
        },
        totalAlunos: null,
        headers: [
          { text: "Nome", align: "start", sortable: true, value: "nomeAluno" },
          { text: "Data Nascimento", align: "start", sortable: true, value: "dataNascimentoAluno" },
          { text: "Outros Atributos", align: "start", sortable: true, value: "outrosAtributosAluno" },
        ],
        alunos: [],
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
        AlunoService.listar({
          nomeAluno: this.filtroAluno.nomeAluno,
          dataNascimentoAluno: this.filtroAluno.dataNascimentoAluno,
          outrosAtributosAluno: this.filtroAluno.outrosAtributosAluno,
          page: this.pagination.page - 1,
          size: this.pagination.rowsPerPage,
        })
        .then(({ data }) => {
          this.alunos = data;
          this.totalAlunos = data.length;
        })
        .catch((error) => {
          exibirMensagemErroApi(error.response?.data, "Erro ao carregar alunos. Tente novamente mais tarde.");
        });
      },
      limparFiltro() {
        this.filtroAluno = { ...FILTROS_DEFAULT };
      },
      excluirAluno(item) {
        AlunoService.deletarAluno(item.id)
        .then(() => {
          exibirMensagemSucesso("Aluno excluído com sucesso!");
          this.listar();
        })
        .catch((error) => {
          exibirMensagemErroApi(error.response?.data, "Erro ao excluir aluno. Tente novamente mais tarde.");
        });
      },
      editarAluno(item) {
        this.$router.push({ name: 'CadastroAlunos', params: { id: item.id } });
      },
    },
  };
  </script>  