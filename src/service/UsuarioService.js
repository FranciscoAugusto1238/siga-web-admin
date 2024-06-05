// services/usuarioService.js
import { http } from "./config";

export default {
  listarUsuarios: (params) => {
    return http.get("usuarios/buscarPorFiltros", { params });
  },

  listarUsuariosSelect: (params) => {
    return http.get("usuarios/buscarPorFiltros", { params });
  },

  cadastrarUsuario: (usuario) => {
    return http.post("usuarios", usuario);
  },

  buscarUsuario: (id) => {
    return http.get(`usuarios/${id}`);
  },

  atualizarUsuario: (id, usuario) => {
    return http.put(`usuarios/${id}`, usuario);
  },

  buscarPorFiltros: (params) => {
    return http.get("Revivi", { params });
  },

  deletarUsuario: (id) => {
    return http.delete(`usuarios/${id}`);
  },
};
