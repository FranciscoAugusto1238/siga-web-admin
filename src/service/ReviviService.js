import { http } from "./config";

export default {
  listar: (params) => {
    return http.get("/retirantes/revivi/buscarPorFiltros",{ params });
  },

  salvarAssociados: (associado) => {
    return http.post("retirantes/revivi", associado);
  },

  atualizar: (id) => {
    return http.get(`retirantes/revivi/${id}`);
  },

  buscarPorFiltros: (params) => {
    return http.get("Revivi", { params });
  },

  deletar: (id) => {
    return http.delete(`retirantes/revivi/${id}`);
  },
};
