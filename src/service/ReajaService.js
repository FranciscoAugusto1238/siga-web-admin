import { http } from "./config";

export default {
  listar: (params) => {
    return http.get("retirantes/reaja/buscarPorFiltros", { params });
  },

  salvarAssociados: (associado) => {
    return http.post("retirantes/reaja", associado);
  },

  atualizar: (id) => {
    return http.get(`retirantes/reaja/${id}`);
  },

  buscarPorFiltros: (params) => {
    return http.get("Reaja", { params });
  },

  deletar: (id) => {
    return http.delete(`retirantes/reaja/${id}`);
  },
};
