import { http } from "./config";

export default {

  listar() {
    return http.get("aulas");
  },

  cadastrarAula: (aula) => {
    return http.post("aulas", aula);
  },

  buscarAula: (id) => {
    return http.get(`aulas/${id}`);
  },

  deletarAula: (id) => {
    return http.delete(`aulas/${id}`);
  },
};
