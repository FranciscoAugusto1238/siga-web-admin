<template>
  <a-container title="Cadastro de Atividades">
    <v-form ref="form" lazy-validation color="transparent">
      <v-row align="center">
        <v-col>
          <v-select
            label="Disciplina"
            :items="disciplina.map(disciplina => disciplina.nomeDisciplina)"
            v-model="atividade.disciplina"
          />
          <v-text-field v-model="atividade.dataEntrega" label="Data de Entrega da Atividade" v-mask="'##-##-####'" />
        </v-col>
        <v-col>
          <v-text-field v-model="atividade.descricaoAtividade" label="Descrição"/>
          <v-text-field v-model="atividade.outrosAtributosAtividade" label="Outros Atributos" /> 
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
import * as disciplinaService from "@/service/DisciplinaService";
import * as atividadeService from "@/service/AtividadeService";
import {exibirMensagemErroApi, exibirMensagemSucesso} from "@/util/MessageUtils.js";

export default {
  name: "CadastroAtividades",
  data() {
    return {
      disciplina: [],
      atividade: {
        disciplina: null, 
        outrosAtributosAtividade: "",
        descricaoAtividade: "",
        dataEntrega: "",
      },
      buttonLoading: false,
    };
  },
  mounted() {
    this.listarDisciplinas();
  },
  methods: {
    listarDisciplinas() {
      disciplinaService.default
        .listar()
        .then(({ data }) => {
          this.disciplina = data;
        })
        .catch((error) => {
          exibirMensagemErroApi(error?.response?.data, "Erro ao listar disciplinas");
          console.log(error);
        });
    },
    salvar() {
      this.buttonLoading = true;
      atividadeService.default
        .cadastrarAtividade(this.atividade)
        .then(() => {
          exibirMensagemSucesso("Atividade cadastrada com sucesso!");
          this.resetForm();
        })
        .catch((error) => {
          exibirMensagemErroApi(error?.response?.data, "Erro ao cadastrar atividade");
          console.log(error);
        })
        .finally(() => {
          this.buttonLoading = false;
        });
    },
    resetForm() {
      this.atividade.disciplina = null;
      this.atividade.outrosAtributosAtividade = "";
      this.atividade.descricaoAtividade = "";
      this.atividade.dataEntregaAtividade = "";
    },
  },
};
</script>
