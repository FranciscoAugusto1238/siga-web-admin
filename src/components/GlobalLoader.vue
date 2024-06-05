<template>
	<v-overlay opacity="0.8" z-index="10000" :value="exibirCarregando">
		<v-row align="center" justify="center">
			<v-col cols="auto">
				<v-progress-circular indeterminate color="white" size="75" width="8" />
			</v-col>
			<v-col cols="12" />
			<v-col cols="auto">
				{{ carregandoMsg }}
			</v-col>
		</v-row>
	</v-overlay>
</template>

  <script>
	import { useCarregamentoStore } from "@/store/carregamento.js";

	export default {
		name: "GlobalLoader",
		setup(){
			const carregamentoStore = useCarregamentoStore();

			const carregando = carregamentoStore.carregando;
			const exibirCarregando = () => carregando.value.length > 0;
			const carregandoMsg = () => {
				if(exibirCarregando()){
					return carregando.value[carregando.value.length - 1];
				}
				return "...";
			};

			return {
				exibirCarregando,
				carregandoMsg,
			};
		},
	};
  </script>
