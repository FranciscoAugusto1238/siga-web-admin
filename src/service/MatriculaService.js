import { http } from "./config";

export default {

  listar() {
    return http.get("matriculas");
  },

  salvarMatricula: (matricula) => {
    return http.post("matriculas", matricula);
  },

  atualizarMatricula: (id, matricula) => {
    return http.put(`matriculas/${id}`, matricula);
  },

  buscarMatriculaPorId: (id) => {
    return http.get(`matriculas/${id}`);
  },

  deletarMatricula: (id) => {
    return http.delete(`matriculas/${id}`);
  },
};
