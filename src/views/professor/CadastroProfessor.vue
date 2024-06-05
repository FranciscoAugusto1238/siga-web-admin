<template>
	<a-container title="Cadastro de Professores">
		<v-form ref="form" lazy-validation color="transparent">
			<h2 class="mb-4" style="margin-left: 0;">Dados professor</h2>
			<v-row align="center">
				<v-col>
					<v-text-field v-model="professor.nomeProfessor" label="Nome completo" />
				</v-col>
				<v-col>
					<v-text-field label="Especialidade" :items="idades" v-model="professor.especialidadeProfessor"/>			
				</v-col>
				<v-col>
					<v-text-field v-model="professor.outrosAtributos" label="Outros Atributos" />
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
import * as UsuarioService from "@/service/UsuarioService";
import { exibirMensagemErroApi, exibirMensagemSucesso, } from "@/util/MessageUtils.js";

export default {
  components: {},
  name: "CadastroProfessor",
  mounted(){
			if(this.isEditar){
				this.listarAssociado();
			}
		},
  computed: {
    isEditar() {
      return this.$route.params?.id;
    },
  },
  data() {
    return {
	professor: this.newProfessor(),
    buttonLoading: false,
    emailDisabled: false,
    };
  },
  methods: {
    newProfessor() {
      return {
        nomeProfessor: "",
        especialidadeProfessor: "",
        outrosAtributos: "",
        
      };
    },
    handleDateSelected(date) {
      this.dataSelecionada = date;
    },
	listarAssociado(){
				if(this.isEditar){
					UsuarioService
						.buscarUsuario(this.isEditar)
						.then(({ data }) => {
							this.usuario = data;
						}).catch((error) => {
							exibirMensagemErroApi(error?.response?.data, "Não foi possível listar o usuário!. Tente novamente mais tarde.");
							console.log(error);
						})
						.finally(() => {
							this.$finalizarCarregando();
						});
				}
			},
    salvar() {
      console.log(this.usuario);
      UsuarioService
        .cadastrarUsuario(this.usuario)
        .then(() => {
          this.usuario = {}; // Se necessário, limpe os dados após o salvamento
          this.buttonLoading = false;
          exibirMensagemSucesso("Usuário criado com sucesso!");
        })
        .catch((error) => {
          this.buttonLoading = false;
          exibirMensagemErroApi(
            error.response?.data,
            "Erro ao salvar usuário! Tente novamente mais tarde."
          );
        })
        .finally(() => {
          this.usuario = this.newUsuario();
          this.$router.push("/cadastro-usuario");
        });
    },
  },
};
</script>
