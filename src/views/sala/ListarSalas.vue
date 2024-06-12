<template>
    <a-container title="Listar Salas de Aula">
      <v-form ref="form" lazy-validation color="transparent">
        <v-row align="center">
          <v-col class="pr-2">
            <v-text-field v-model="filtroSala.nomeSala" label="Nome completo" />
          </v-col>
          <v-col class="pr-2">
            <v-text-field v-model="filtroSala.capacidadeSala" label="Capacidade" />
          </v-col>
          <v-col class="pr-2">
            <v-text-field v-model="filtroSala.outrosAtributosSala" label="Outros Atributos" />
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
            :server-items-length="totalSalas"
            :headers="headers"
            :items="salas"
            :items-per-page="pagination.rowsPerPage"
            v-model:options="pagination"
            :actionButtons="{ excluir: true, editar: true }"
            @delete="excluirSala"
            @editar="editarSala"
          />
        </v-col>
      </v-row>
    </a-container>
  </template>
  
  <script>
  import { exibirMensagemErroApi, exibirMensagemSucesso } from "@/util/MessageUtils.js";
  import SalaService from "@/service/SalaService.js";
  
  const FILTROS_DEFAULT = {
    nomeSala: null,
    capacidadeSala: null,
    outrosAtributosSala: null,
  };
  
  export default {
    name: "ListarSalas",
    data() {
      return {
        filtroSala: FILTROS_DEFAULT,
        pagination: {
          rowsPerPage: 10,
          page: 1,
          rowsNumber: 0,
        },
        totalSalas: null,
        headers: [
          { text: "Nome", align: "start", sortable: true, value: "nomeSala" },
          { text: "Capacidade", align: "start", sortable: true, value: "capacidadeSala" },
          { text: "Outros Atributos", align: "start", sortable: true, value: "outrosAtributosSala" },
        ],
        salas: [],
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
        SalaService.listar({
          nomeSala: this.filtroSala.nomeSala,
          capacidadeSala: this.filtroSala.capacidadeSala,
          outrosAtributosSala: this.filtroSala.outrosAtributosSala,
          page: this.pagination.page - 1,
          size: this.pagination.rowsPerPage,
        })
        .then(({ data }) => {
          this.salas = data;
          this.totalSalas = data.length;
        })
        .catch((error) => {
          exibirMensagemErroApi(error.response?.data, "Erro ao carregar salas. Tente novamente mais tarde.");
        });
      },
      limparFiltro() {
        this.filtroSala = { ...FILTROS_DEFAULT };
      },
      excluirSala(item) {
        SalaService.deletarSala(item.id)
        .then(() => {
          exibirMensagemSucesso("Sala excluída com sucesso!");
          this.listar();
        })
        .catch((error) => {
          exibirMensagemErroApi(error.response?.data, "Erro ao excluir sala. Tente novamente mais tarde.");
        });
      },
      editarSala(item) {
        this.$router.push({ name: 'CadastroSala', params: { id: item.id } });
      },
    },
  };
  </script>
  