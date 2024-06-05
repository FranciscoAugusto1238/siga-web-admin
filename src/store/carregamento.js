// stores/counter.js
import { defineStore } from "pinia";

export const useCarregamentoStore = defineStore("carregamento", {
	state: () => {
		return { carregando: [] };
	},
	// could also be defined as
	// state: () => ({ count: 0 })
	actions: {
		iniciarCarregando(mensagem){
			this.carregando.push(mensagem);
		},
		finalizarCarregando(mensagem){
			const index = this.carregando.indexOf(mensagem);
			if(index >= 0){
				this.carregando.splice(index, 1);
			}
		},
	},
});
