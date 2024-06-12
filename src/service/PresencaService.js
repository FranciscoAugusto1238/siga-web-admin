import { http } from "./config";

export default {

  cadastrarPresenca: (presenca) => {
    return http.post("presenca", presenca);
  },

  buscarPresenca: (id) => {
    return http.get(`presenca/${id}`);
  },

  deletarPresenca: (id) => {
    return http.delete(`presenca/${id}`);
  },
};
