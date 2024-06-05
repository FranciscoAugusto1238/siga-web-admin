import { http } from "./config";

export default {


  listar: (params) => {
    return http.get("calendario", { params });
  },

  salvarEventos: (calendario) => {
    return http.post("calendario", calendario);
  },

  deletar: (id) => {
    return http.delete(`calendario/${id}`);
  },

	buscarEventorPorDia: (data) => {
    return http.get("calendario/eventos", { params: { data } });
	},

};
