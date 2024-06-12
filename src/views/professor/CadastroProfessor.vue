<template>
  <a-container title="Cadastro de Professores">
    <v-form ref="form" lazy-validation color="transparent">
      <h2 class="mb-4" style="margin-left: 0;">Dados professor</h2>
      <v-row align="center">
        <v-col>
          <v-text-field v-model="professor.nomeProfessor" label="Nome completo" />
        </v-col>
        <v-col>
          <v-text-field label="Especialidade" v-model="professor.especialidadeProfessor"/>			
        </v-col>
        <v-col>
          <v-text-field v-model="professor.outrosAtributosProfessor" label="Outros Atributos" />
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
import ProfessorService from "@/service/ProfessorService";
import { exibirMensagemErroApi, exibirMensagemSucesso } from "@/util/MessageUtils.js";

export default {
  name: "CadastroProfessor",
  data() {
    return {
      professor: this.newProfessor(),
      buttonLoading: false,
      isEditar: false,
    };
  },
  mounted() {
    if (this.$route.params?.id) {
      this.isEditar = true;
      this.buscarProfessor();
    }
  },
  methods: {
    newProfessor() {
      return {
        nomeProfessor: "",
        especialidadeProfessor: "",
        outrosAtributosProfessor: "",
      };
    },
    buscarProfessor() {
      ProfessorService.buscarProfessor(this.$route.params.id)
        .then((response) => {
          this.professor = response.data;
        })
        .catch((error) => {
          exibirMensagemErroApi(
            error?.response?.data,
            "Não foi possível buscar o professor! Tente novamente mais tarde."
          );
          console.error(error);
        });
    },
    salvar() {
      this.buttonLoading = true;
      // Verifica se é uma edição ou um novo cadastro
      if (this.isEditar) {
        this.atualizarProfessor();
      } else {
        this.cadastrarProfessor();
      }
    },
    cadastrarProfessor() {
      ProfessorService.cadastrarProfessor(this.professor)
        .then(() => {
          this.buttonLoading = false;
          exibirMensagemSucesso("Professor cadastrado com sucesso!");
          this.$router.push("/cadastro-professores");
        })
        .catch((error) => {
          this.buttonLoading = false;
          exibirMensagemErroApi(
            error?.response?.data,
            "Erro ao cadastrar professor! Tente novamente mais tarde."
          );
        });
    },
    atualizarProfessor() {
      ProfessorService.atualizarProfessor(this.$route.params.id, this.professor)
        .then(() => {
          this.buttonLoading = false;
          exibirMensagemSucesso("Professor atualizado com sucesso!");
          this.$router.push("/cadastro-professores");
        })
        .catch((error) => {
          this.buttonLoading = false;
          exibirMensagemErroApi(
            error?.response?.data,
            "Erro ao atualizar professor! Tente novamente mais tarde."
          );
        });
    },
  },
};
</script>
