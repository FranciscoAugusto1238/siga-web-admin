import { http } from "./config";

export default {
  listar: (params) => {
    return http.get("/retirantes/teologia/buscarPorFiltros", { params });
  },

  salvarAssociados: (associado) => {
    return http.post("retirantes/teologia", associado);
  },

  atualizar: (id) => {
    return http.get(`retirantes/teologia/${id}`);
  },

  buscarPorFiltros: (params) => {
    return http.get("Teologia", { params });
  },

  deletar: (id) => {
    return http.delete(`/retirantes/teologia/${id}`);
  },
};
