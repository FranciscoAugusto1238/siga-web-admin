import { http } from "./config";

export default {

  listar(){
    return http.get("disciplinas");
  },

  cadastrarDisciplina: (disciplina) => {
    return http.post("disciplinas", disciplina);
  },

  buscarDisciplina: (id) => {
    return http.get(`disciplinas/${id}`);
  },

  deletarDisciplina: (id) => {
    return http.delete(`disciplinas/${id}`);
  },
};
