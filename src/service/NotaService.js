import { http } from "./config";

export default {

  listar() {
    return http.get("notas");
  },

  cadastrarNota: (nota) => {
    return http.post("notas", nota);
  },

  buscarNota: (id) => {
    return http.get(`notas/${id}`);
  },

  deletarNota: (id) => {
    return http.delete(`notas/${id}`);
  },
};
