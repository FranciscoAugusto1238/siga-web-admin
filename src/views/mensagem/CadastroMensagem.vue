<template>
    <a-container title="Cadastro de Mensagens">
      <v-form ref="form" lazy-validation color="transparent">
        <v-row align="center">
          <v-col>
                <v-select label="Aluno" :items="aluno.map(mensagens => mensagens.nomeAluno)" v-model="mensagens.selectedAluno"/>  
                <v-text-field v-model="mensagens.dataMensagem" label="Data da Mensagem" v-mask="'##-##-####'" />
          </v-col>
          <v-col>
            <v-text-field v-model="mensagens.conteudoMensagem" label="Conteudo da Mensagem"/>
            <v-text-field v-model="mensagens.outrosAtributosMensagem" label="Outros Atributos" /> 
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
  import * as usuarioService from "@/service/UsuarioService";
  import * as reajaService from "@/service/ReajaService";
  import {exibirMensagemErroApi,exibirMensagemSucesso,exibirMensagemErro,} from "@/util/MessageUtils.js";
  export default {
    components: {},
    name: "CadastroMensagem",
    data() {
      return {
        aluno: [],
        mensagens: {
          selectedAluno: null, 
          outrosAtributosMensagem: "",
          conteudoMensagem: "",
          dataMensagem: "",
        },
      };
    },
    mounted(){
              if(this.isEditar){
                  this.listarReaja();
              }
        this.listarUsuarios(); 
          },
      computed: {
              isEditar(){
                  return this.$route.params?.id;
              },
          },
    methods: {
      listarUsuarios() {
        usuarioService.default
      .listarUsuariosSelect()
      .then(({ data }) => {
        this.aula = data.content;
      })
      .catch((error) => {
        exibirMensagemErroApi(
          error?.response?.data,
          "Não foi possível listar os usuários!. Tente novamente mais tarde."
        );
        console.log(error);
      });
  },
      listarReaja(){
                      reajaService.default
                          .atualizar(this.isEditar)
                          .then(({ data }) => {
                              this.usuario = data;
                          }).catch((error) => {
                              exibirMensagemErroApi(error?.response?.data, "Não foi possível listar o cadastro reaja!. Tente novamente mais tarde.");
                              console.log(error);
                          })
                          .finally(() => {
                              this.$finalizarCarregando();
                          });
              },
      salvar() {
        if (!this.usuario.selectedUsuario) {
         exibirMensagemErro("Selecione um usuário!");
          return;
        }
        const usuarioSelecionado = this.usuarios.find(usuario => usuario.nomeCompleto === this.usuario.selectedUsuario);
        if (!usuarioSelecionado) {
          exibirMensagemErro("Usuário selecionado não encontrado!");
          return;
        }
        const idUsuarioSelecionado = usuarioSelecionado.id;
        const novoAssociado = {
          selectedUsuario: idUsuarioSelecionado,
          retiro: this.usuario.retiro
        };
        reajaService.default
          .salvarAssociados(novoAssociado)
          .then(() => {
            this.usuario = {};
            this.buttonLoading = false;
            exibirMensagemSucesso("Cadastro em REAJA realizado com sucesso!");
          })
          .catch((error) => {
            this.buttonLoading = false;
            exibirMensagemErroApi(
              error.response?.data,
              "Erro ao salvar cadastro!. Tente novamente mais tarde."
            );
          })
          .finally(() => {
            this.$router.push("/cadastro-reaja");
          });
      },
      atualizar() {
        reajaService.default
          .atualizar(this.isEditar, this.usuario)
          .then(() => {
            this.buttonLoading = false;
            exibirMensagemSucesso("Usuario atualizado com sucesso!");
            this.$router.push("/cadastro-reaja");
          })
          .catch((error) => {
            this.buttonLoading = false;
            exibirMensagemErroApi(
              error.response?.data,
              "Erro ao atualizar cadastro!. Tente novamente mais tarde."
            );
          });
      },
    },
  };
  </script>
  