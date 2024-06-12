<template>
  <a-container title="Cadastro de Aula">
    <v-form ref="form" lazy-validation color="transparent">
      <v-row align="center">
        <v-col>
          <v-select
            label="Disciplina"
            :items="disciplina.map(disciplina => disciplina.nomeDisciplina)"
            v-model="aula.disciplina"
          />
          <v-text-field v-model="aula.horarioAula" label="Horário da Aula" />
        </v-col>
        <v-col>
          <v-select
            label="Professor"
            :items="professor.map(professor => professor.nomeProfessor)"
            v-model="aula.professor"
          />
          <v-text-field v-model="aula.outrosAtributosAula" label="Outros Atributos" />
        </v-col>
        <v-col>
          <v-select
            label="Sala"
            :items="sala.map(sala => sala.nomeSala)"
            v-model="aula.salaDeAula"
          />
        </v-col>
      </v-row>
    </v-form>
    <v-container>
      <v-row justify="center" class="bottom_salvar">
        <v-col cols="auto">
          <a-btn
            buttonName="Salvar"
            @click="salvar"
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
import * as professorService from "@/service/ProfessorService";
import * as salaService from "@/service/SalaService";
import * as aulaService from "@/service/AulaService";
import {exibirMensagemErroApi, exibirMensagemSucesso} from "@/util/MessageUtils.js";

export default {
  name: "CadastroAula",
  data() {
    return {
      disciplina: [],
      professor: [],
      sala: [],
      aula: {
        disciplina: null,
        professor: null,
        salaDeAula: null,
        horarioAula: "",
        outrosAtributosAula: "",
      },
      buttonLoading: false,
    };
  },
  mounted() {
    this.listarDisciplinas();
    this.listarProfessores();
    this.listarSalas();
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
    listarProfessores() {
      professorService.default
        .listar()
        .then(({ data }) => {
          this.professor = data;
        })
        .catch((error) => {
          exibirMensagemErroApi(error?.response?.data, "Erro ao listar professores");
          console.log(error);
        });
    },
    listarSalas() {
      salaService.default
        .listar()
        .then(({ data }) => {
          this.sala = data;
        })
        .catch((error) => {
          exibirMensagemErroApi(error?.response?.data, "Erro ao listar salas");
          console.log(error);
        });
    },
    salvar() {
      this.buttonLoading = true;
      aulaService.default
        .cadastrarAula(this.aula)
        .then(() => {
          exibirMensagemSucesso("Aula cadastrada com sucesso!");
          this.resetForm();
        })
        .catch((error) => {
          exibirMensagemErroApi(error?.response?.data, "Erro ao cadastrar aula");
          console.log(error);
        })
        .finally(() => {
          this.buttonLoading = false;
        });
    },
    resetForm() {
      this.aula.disciplina = null;
      this.aula.professor = null;
      this.aula.salaDeAula = null;
      this.aula.horarioAula = "";
      this.aula.outrosAtributosAula = "";
    },
  },
};
</script>
