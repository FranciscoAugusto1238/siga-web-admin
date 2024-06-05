import { useCarregamentoStore } from "@/store/carregamento.js";
// import { $verificaPermissao } from "../keycloak/roles.js";

const $carregando = (mensagem = "Carregando dados...") => {
	const store = useCarregamentoStore();
	store.iniciarCarregando(mensagem);
};

const $finalizarCarregando = (mensagem = "Carregando dados...") => {
	const store = useCarregamentoStore();
	store.iniciarCarregando(mensagem);
};

const $salvando = (mensagem = "Salvando dados...") => {
	const store = useCarregamentoStore();
	store.iniciarCarregando(mensagem);
};

const $finalizarSalvando = (mensagem = "Salvando dados...") => {
	const store = useCarregamentoStore();
	store.iniciarCarregando(mensagem);
};

export default {

	$carregando,

	$finalizarCarregando,

	$salvando,

	$finalizarSalvando,
	// $verificaPermissao,

};
