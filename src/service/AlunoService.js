import { http } from "./config";

export default {

  listar() {
    return http.get("alunos");
  },

  cadastrarAluno: (aluno) => {
    return http.post("alunos", aluno);
  },

  atualizarAluno: (id, aluno) => {
    return http.put(`alunos/${id}`, aluno);
  },

  buscarAluno: (id) => {
    return http.get(`alunos/${id}`);
  },

  deletarAluno: (id) => {
    return http.delete(`alunos/${id}`);
  },
};
