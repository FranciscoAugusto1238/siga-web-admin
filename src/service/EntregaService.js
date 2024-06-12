import { http } from "./config";

export default {

  listar: () => {
    return http.get("entregas");
  },

  salvarEntrega: (entrega) => {
    return http.post("entregas", entrega);
  },

  atualizarEntrega: (id, entrega) => {
    return http.put(`entregas/${id}`, entrega);
  },

  buscarEntregaPorId: (id) => {
    return http.get(`entregas/${id}`);
  },

  deletarEntrega: (id) => {
    return http.delete(`entregas/${id}`);
  },
};
