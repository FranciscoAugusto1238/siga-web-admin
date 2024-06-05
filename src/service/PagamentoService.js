// service/PagamentoService.js

import { http } from "@/service/config";

export default {
  cadastrarPagamento: (pagamento) => {
    return http.post("/pagamentos", pagamento);
  },

  listarCadastroUsuarios: () => {
    return http.get("/pagamentos/cadastro-usuarios");
  },

  listarPagamentoTipos: () => {
    return http.get("/pagamentos/pagamento-tipos");
  },

  listarPagamentoFormas: () => {
    return http.get("/pagamentos/pagamento-formas");
  },
};
