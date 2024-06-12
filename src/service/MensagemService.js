import { http } from "./config";

export default {

  listar: () => {
    return http.get("mensagens");
  },

  salvarMensagem: (mensagem) => {
    return http.post("mensagens", mensagem);
  },

  atualizarMensagem: (id, mensagem) => {
    return http.put(`mensagens/${id}`, mensagem);
  },

  buscarMensagemPorId: (id) => {
    return http.get(`mensagens/${id}`);
  },

  deletarMensagem: (id) => {
    return http.delete(`mensagens/${id}`);
  },
};
