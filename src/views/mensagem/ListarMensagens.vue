<template>
    <a-container title="Listar Mensagens">
      <v-form ref="form" lazy-validation color="transparent">
        <v-row align="center">
          <v-col>
            <v-text-field
              label="Aluno"
              v-model="filtroMensagem.aluno"
            />
            <v-text-field v-model="filtroMensagem.dataMensagem" label="Data da Mensagem" v-mask="'##-##-####'" />
          </v-col>
          <v-col>
            <v-text-field v-model="filtroMensagem.conteudoMensagem" label="Conteúdo da Mensagem"/>
            <v-text-field v-model="filtroMensagem.outrosAtributosMensagem" label="Outros Atributos" /> 
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
            :server-items-length="totalMensagens"
            :headers="headers"
            :items="mensagens"
            :items-per-page="pagination.rowsPerPage"
            v-model:options="pagination"
            :actionButtons="{ excluir: true }"
            @delete="excluirMensagem"
          />
        </v-col>
      </v-row>
    </a-container>
  </template>
  
  <script>
  import { exibirMensagemErroApi, exibirMensagemSucesso } from "@/util/MessageUtils.js";
  import MensagemService from "@/service/MensagemService.js";
  
  const FILTROS_DEFAULT = {
    aluno: null,
    conteudoMensagem: null,
    outrosAtributosMensagem: null,
    dataMensagem: null,
  };
  
  export default {
    name: "ListarMensagens",
    data() {
      return {
        filtroMensagem: FILTROS_DEFAULT,
        pagination: {
          rowsPerPage: 10,
          page: 1,
          rowsNumber: 0,
        },
        totalMensagens: null,
        headers: [
          { text: "Aluno", align: "start", sortable: true, value: "aluno.nomeAluno" },
          { text: "Conteúdo", align: "start", sortable: true, value: "conteudoMensagem" },
          { text: "Data da Mensagem", align: "start", sortable: true, value: "dataMensagem" },
          { text: "Outros Atributos", align: "start", sortable: true, value: "outrosAtributosMensagem" },
        ],
        mensagens: [],
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
        MensagemService.listar({
          aluno: this.filtroMensagem.aluno,
          conteudoMensagem: this.filtroMensagem.conteudoMensagem,
          outrosAtributosMensagem: this.filtroMensagem.outrosAtributosMensagem,
          dataMensagem: this.filtroMensagem.dataMensagem,
          page: this.pagination.page - 1,
          size: this.pagination.rowsPerPage,
        })
        .then(({ data }) => {
          this.mensagens = data;
          this.totalMensagens = data.length;
        })
        .catch((error) => {
          exibirMensagemErroApi(error.response?.data, "Erro ao carregar mensagens. Tente novamente mais tarde.");
        });
      },
      limparFiltro() {
        this.filtroMensagem = { ...FILTROS_DEFAULT };
      },
      excluirMensagem(item) {
        MensagemService.deletarMensagem(item.id)
        .then(() => {
          exibirMensagemSucesso("Mensagem excluída com sucesso!");
          this.listar();
        })
        .catch((error) => {
          exibirMensagemErroApi(error.response?.data, "Erro ao excluir mensagem. Tente novamente mais tarde.");
        });
      },
    },
  };
  </script>
  