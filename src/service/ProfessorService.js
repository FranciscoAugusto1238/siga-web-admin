import { http } from "./config";

export default {

  listar() {
    return http.get("professores");
  },

  cadastrarProfessor: (professor) => {
    return http.post("professores", professor);
  },

  atualizarProfessor: (id, professor) => {
    return http.put(`professores/${id}`, professor);
  },

  buscarProfessor: (id) => {
    return http.get(`professores/${id}`);
  },

  deletarProfessor: (id) => {
    return http.delete(`professores/${id}`);
  },
};
