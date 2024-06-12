<template>
  <a-container title="Cadastro de Entrega de Atividade">
    <v-form ref="form" lazy-validation color="transparent">
      <v-row align="center">
        <v-col>
          <v-select
            label="Atividade"
            :items="atividade.map(atividade => atividade.descricaoAtividade)"
            v-model="entrega.notas"
          />
          <v-text-field v-model="entrega.dataEntrega" label="Data de Entrega" v-mask="'##-##-####'" />
        </v-col>
        <v-col>
          <v-select
            label="Aluno"
            :items="aluno.map(aluno => aluno.nomeAluno)"
            v-model="entrega.aluno"
          />          
          <v-text-field v-model="entrega.outrosAtributosEntrega" label="Outros Atributos" /> 
        </v-col>
      </v-row>
    </v-form>
    <v-container>
      <v-row justify="center" class="bottom_salvar">
        <v-col cols="auto">
          <a-btn
            buttonName="Salvar"
            v-on:click="salvar"
            :needIcon="true"
            style="background-color: gray; color: white"
            :needLoading="buttonLoading"
          />
        </v-col>
      </v-row>
    </v-container>
  </a-container>
</template>

<script>
import * as atividadeService from "@/service/AtividadeService";
import * as alunoService from "@/service/AlunoService";
import * as entregaService from "@/service/EntregaService";
import {exibirMensagemErroApi, exibirMensagemSucesso} from "@/util/MessageUtils.js";

export default {
  name: "CadastroEntrega",
  data() {
    return {
      atividade: [],
      aluno: [],
      entrega: {
        notas: null, 
        aluno: null, 
        outrosAtributosEntrega: "",
        dataEntrega: "",
      },
      buttonLoading: false,
    };
  },
  mounted() {
    this.listarAtividades();
    this.listarAlunos();
  },
  methods: {
    listarAtividades() {
      atividadeService.default
        .listar()
        .then(({ data }) => {
          this.atividade = data;
        })
        .catch((error) => {
          exibirMensagemErroApi(error?.response?.data, "Erro ao listar atividades");
          console.log(error);
        });
    },
    listarAlunos() {
      alunoService.default
        .listar()
        .then(({ data }) => {
          this.aluno = data;
        })
        .catch((error) => {
          exibirMensagemErroApi(error?.response?.data, "Erro ao listar alunos");
          console.log(error);
        });
    },
    salvar() {
      this.buttonLoading = true;
      entregaService.default
        .salvarEntrega(this.entrega)
        .then(() => {
          exibirMensagemSucesso("Entrega cadastrada com sucesso!");
          this.resetForm();
        })
        .catch((error) => {
          exibirMensagemErroApi(error?.response?.data, "Erro ao cadastrar entrega");
          console.log(error);
        })
        .finally(() => {
          this.buttonLoading = false;
        });
    },
    resetForm() {
      this.entrega.selectedAtividade = null;
      this.entrega.selectedAluno = null;
      this.entrega.outrosAtributosEntrega = "";
      this.entrega.dataEntrega = "";
    },
  },
};
</script>
