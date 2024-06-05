import { http } from "./config";

export default {

  listar: (params) => {
    return http.get("associados/buscarPorFiltros", { params });
  },

  salvarAssociados: (associado) => {
    return http.post("associados", associado);
  },

  atualizar: (id) => {
    return http.get(`associados/${id}`);
  },

  buscarPorFiltros: (params) => {
    return http.get("associados", { params });
  },

  deletar: (id) => {
    return http.delete(`associados/${id}`);
  },
};
