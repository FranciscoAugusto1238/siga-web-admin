<template>
  <a-container title="Cadastro de Disciplina">
    <v-form ref="form" lazy-validation color="transparent">
      <h2 class="mb-4" style="margin-left: 0;">Dados disciplina</h2>
      <v-row align="center">
        <v-col>
          <v-text-field v-model="disciplina.nomeDisciplina" label="Nome completo" />
        </v-col>
        <v-col>
          <v-text-field label="Descrição da disciplina" v-model="disciplina.descricaoDisciplina"/>			
        </v-col>
        <v-col>
          <v-text-field v-model="disciplina.outrosAtributosDisciplina" label="Outros Atributos" />
        </v-col>
      </v-row>
    </v-form>

    <v-container>
      <v-row justify="end">
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
import DisciplinaService from "@/service/DisciplinaService";
import { exibirMensagemErroApi, exibirMensagemSucesso } from "@/util/MessageUtils.js";

export default {
  name: "CadastroDisciplina",
  data() {
    return {
      disciplina: this.newDisciplina(),
      buttonLoading: false,
      isEditar: false,
    };
  },
  mounted() {
    if (this.$route.params?.id) {
      this.isEditar = true;
      this.buscarDisciplina();
    }
  },
  methods: {
    newDisciplina() {
      return {
        nomeDisciplina: "",
        descricaoDisciplina: "",
        outrosAtributosDisciplina: "",
      };
    },
    buscarDisciplina() {
      DisciplinaService.buscarDisciplina(this.$route.params.id)
        .then((response) => {
          this.disciplina = response.data;
        })
        .catch((error) => {
          exibirMensagemErroApi(
            error?.response?.data,
            "Não foi possível buscar a disciplina! Tente novamente mais tarde."
          );
          console.error(error);
        });
    },
    salvar() {
      this.buttonLoading = true;
      if (this.isEditar) {
        this.atualizarDisciplina();
      } else {
        this.cadastrarDisciplina();
      }
    },
    cadastrarDisciplina() {
      DisciplinaService.cadastrarDisciplina(this.disciplina)
        .then(() => {
          this.buttonLoading = false;
          exibirMensagemSucesso("Disciplina cadastrada com sucesso!");
        })
        .catch((error) => {
          this.buttonLoading = false;
          exibirMensagemErroApi(
            error?.response?.data,
            "Erro ao cadastrar disciplina! Tente novamente mais tarde."
          );
        });
    },
    atualizarDisciplina() {
      DisciplinaService.atualizarDisciplina(this.$route.params.id, this.disciplina)
        .then(() => {
          this.buttonLoading = false;
          exibirMensagemSucesso("Disciplina atualizada com sucesso!");
          this.$router.push("/cadastro-disciplinas");
        })
        .catch((error) => {
          this.buttonLoading = false;
          exibirMensagemErroApi(
            error?.response?.data,
            "Erro ao atualizar disciplina! Tente novamente mais tarde."
          );
        });
    },
  },
};
</script>
