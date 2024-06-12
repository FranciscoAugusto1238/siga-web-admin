import { http } from "./config";

export default {

  listar() {
    return http.get("salas");
  },

  cadastrarSala: (sala) => {
    return http.post("salas", sala);
  },

  buscarSala: (id) => {
    return http.get(`salas/${id}`);
  },

  deletarSala: (id) => {
    return http.delete(`salas/${id}`);
  },
};
