import { http } from "./config";

export default {

  listar() {
    return http.get("atividades");
  },

  cadastrarAtividade: (atividade) => {
    return http.post("atividades", atividade);
  },

  atualizarAtividade: (id, atividade) => {
    return http.put(`atividades/${id}`, atividade);
  },

  buscarAtividade: (id) => {
    return http.get(`atividades/${id}`);
  },

  deletarAtividade: (id) => {
    return http.delete(`atividades/${id}`);
  },
};
