<template>
	<v-footer dense class="bg-primary-lighten-1" elevation="6">
		<v-row justify="center" no-gutters>
			<v-col class="text-center pa-2 meu-texto-grande" cols="12"> Desenvolvido por Francisco Augusto e Diego Alipio </v-col>
		</v-row>
	</v-footer>
</template>

<script>
	export default {
		name: "RodapeR2da",
	};
</script>

<style scoped>
/* eslint-disable-next-line vue-scoped-css/no-unused-selector*/
.v-footer:deep() {
	z-index: 1007;
	max-height: 56px;
}
.meu-texto-grande {
  font-size: 16px; /* Tamanho de fonte desejado em pixels */
}
</style>
