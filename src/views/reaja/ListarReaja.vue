<template>
  <a-container title="Listar Reaja">
    <v-form ref="form" lazy-validation color="transparent">
      <v-row align="center">
        <v-col class="pr-2">
            <v-text-field v-model="filtroAutor.nomeCompleto" label="Nome" @input="formatInput"/>
        </v-col>
        <v-col class="pr-2">
            <v-text-field v-model="filtroAutor.rua" label="Endereço"/>
        </v-col>
      </v-row>
    </v-form>
    <v-row align="center">
      <v-col cols="6" lg="6">
        <DataSimples
          @date-selected="handleDateSelected"
          label="Data inicial"
          ref="selecaoData"
        />
      </v-col>
      <v-col cols="6" lg="6">
        <DataSimples
          @date-selected="handleDateSelected2"
          label="Data final"
          ref="selecaoData2"
        />
      </v-col>
    </v-row>
    <v-row justify="space-between">
      <v-col cols="auto">
        <a-btn buttonName="Limpar filtro" @click="limparaFiltro()" style="background-color: gray; color: white"/>
      </v-col>
      <v-col cols="auto">
        <a-btn
          buttonName="Buscar"
          style="background-color: gray; color: white"
          buttonIcon="mdi-text-search-variant"
          @click="listar()"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <tabela-exibicao
          :server-items-length="totalReaja"
          :headers="headers"
          :items="reaja"
          :items-per-page="pagination.rowsPerPage"
          v-model:options="pagination"
          :actionButtons="{ excluir: true, editar: true }"
          @delete="showExcluirAutor"
          @editar="editarReaja"
        />
      </v-col>
    </v-row>
  </a-container>
</template>

<script>
import { exibirMensagemErroApi, exibirMensagemSucesso } from "@/util/MessageUtils.js";
import DataSimples from "@/components/dataTextField/DataSimples.vue";
import * as ReajaService from "@/service/ReajaService.js";

const FILTROS_DEFAULT = {
  nomeCompleto: null,
  rua: null,
};
export default {
  name: "ListarReaja",
  components: {
    DataSimples,
  },
  data() {
    return {
      dataSelecionada: null,
      dataSelecionadaFim: null,
      filtroAutor: FILTROS_DEFAULT,
      pagination: {
        rowsPerPage: 10,
        page: 1,
				rowsNumber: 0,
      },
      novaPagina: null,
      totalReaja: null,
      headers: [
        {
          text: "Nome",
          align: "start",
          sortable: true,
          value: "nomeCompleto",
        },
        {
          text: "Endereço",
          align: "start",
          sortable: true,
          value: "rua",
        },
        {
          text: "Celular",
          align: "start",
          sortable: true,
          value: "telefoneCelular",
        },
      ],
      reaja: [],
    };
  },
  watch: {
    pageOptions: {
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
    formatInput() {
      this.filtroAutor.nome = this.capitalizeFirstLetter(this.filtroAutor.nome);
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    handleDateSelected(date) {
      this.dataSelecionada = date;
    },
    handleDateSelected2(date) {
      this.dataSelecionadaFim = date;
    },
    cadastroReaja(item) {
      const encodedId = encodeURIComponent(item.id);
      this.$router.push("/cadastro-reaja/" + encodedId);
    },
    listar() {
      ReajaService.default
        .listar({
          nomeCompleto: this.filtroAutor.nomeCompleto,
          rua: this.filtroAutor.rua,
          page: this.pagination.page - 1,
          size: this.pagination.rowsPerPage
        })
        .then(({ data }) => {
          console.log(data);
          this.reaja = data.content;
          this.totalAutores = data.content.totalElements;
        })
        .catch((error) => {
          console.log(`Erro: ${error}`);
          exibirMensagemErroApi(
            error.response?.data,
            "Erro ao carregar associados. Tente novamente mais tarde."
          );
        })
        .finally(() => {});
    },
    showExcluirAutor(item){
              ReajaService.default
								.deletar(item.id)
								.then(() => {
									this.listar();
									exibirMensagemSucesso("Associado excluído com sucesso!");
								})
								.catch((error) => {
									console.log(`Erro:${error}`);
									exibirMensagemErroApi(error.response?.data, "Erro ao excluir Associado. Tente novamente mais tarde.");
								})
								.finally(() => {
								});
						},
    editarReaja(item) {
      console.log('Editando reaja com ID:', item.id);
      this.$router.push({ name: 'CadastroReaja', params: { id: item.id } });
    },
    limparaFiltro() {
      this.filtroAutor.nomeCompleto = "";
      this.filtroAutor.rua = "";
      this.$refs.selecaoData.limpar();
      this.$refs.selecaoData2.limpar();
    },
  },
};
</script>
