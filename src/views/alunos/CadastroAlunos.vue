<template>
  <a-container title="Cadastro de Alunos">
    <v-form ref="form" lazy-validation color="transparent">
      <h2 class="mb-4" style="margin-left: 0;">Dados aluno</h2>
      <v-row align="center">
        <v-col>
          <v-text-field v-model="aluno.nomeAluno" label="Nome aluno" />
        </v-col>
        <v-col>
          <v-text-field v-model="aluno.dataNascimentoAluno" label="Data Nascimento" v-mask="'##-##-####'" />
        </v-col>
        <v-col>
          <v-text-field v-model="aluno.outrosAtributosAluno" label="Outros Atributos" />
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
import AlunoService from "@/service/AlunoService";
import { exibirMensagemErroApi, exibirMensagemSucesso } from "@/util/MessageUtils.js";

export default {
  name: "CadastroAlunos",
  data() {
    return {
      aluno: this.newAluno(),
      buttonLoading: false,
      isEditar: false, // Se o aluno está sendo editado ou não
    };
  },
  mounted() {
    // Verifica se é uma edição com base nos parâmetros da rota
    if (this.$route.params?.id) {
      this.isEditar = true;
      this.buscarAluno();
    }
  },
  methods: {
    newAluno() {
      return {
        nomeAluno: "",
        dataNascimentoAluno: "",
        outrosAtributosAluno: "",
      };
    },
    buscarAluno() {
      // Se for uma edição, busca o aluno pelo ID
      AlunoService.buscarAluno(this.$route.params.id)
        .then((response) => {
          this.aluno = response.data;
        })
        .catch((error) => {
          exibirMensagemErroApi(
            error?.response?.data,
            "Não foi possível buscar o aluno! Tente novamente mais tarde."
          );
          console.error(error);
        });
    },
    salvar() {
      this.buttonLoading = true;
      if (this.isEditar) {
        this.atualizarAluno();
      } else {
        this.cadastrarAluno();
      }
    },
    cadastrarAluno() {
      AlunoService.cadastrarAluno(this.aluno)
        .then(() => {
          this.buttonLoading = false;
          exibirMensagemSucesso("Aluno cadastrado com sucesso!");
          this.$router.push("/cadastro-alunos");
        })
        .catch((error) => {
          this.buttonLoading = false;
          exibirMensagemErroApi(
            error?.response?.data,
            "Erro ao cadastrar aluno! Tente novamente mais tarde."
          );
        });
    },
    atualizarAluno() {
      AlunoService.atualizarAluno(this.$route.params.id, this.aluno)
        .then(() => {
          this.buttonLoading = false;
          exibirMensagemSucesso("Aluno atualizado com sucesso!");
          this.$router.push("/cadastro-alunos");
        })
        .catch((error) => {
          this.buttonLoading = false;
          exibirMensagemErroApi(
            error?.response?.data,
            "Erro ao atualizar aluno! Tente novamente mais tarde."
          );
        });
    },
  },
};
</script>
