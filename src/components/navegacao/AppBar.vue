<template>
	<v-app-bar class="app-bar" height="80" color= "blue" :elevation="1" rounded>
		<v-img :src="logoBranca" contain height="86" max-width="200px" class="ml-8" />
		<span class="logo-text">SIGA FAKE</span>
		<v-spacer/>
	</v-app-bar>
</template>

<script>
	import logoBranca  from "@/assets/IFCvideira.png";

	export default {
		data(){
			return {
				logoBranca,
			};
		},
	};
</script>
<style lang="scss" scoped>
	.app-bar{

		&:deep(.v-btn){
			text-transform:uppercase;
		}

		&:deep(.perfil){
			background: rgb(27, 108, 175);
		}

		&:deep(.negocio){
			color:var(--primary);
			background: rgb(27, 108, 175);
		}
	}

	.perfil-button {
		color: white;
	}
	.element.style {
    --v-layout-left: 0px;
    --v-layout-right: 0px;
    --v-layout-top: 0px;
    --v-layout-bottom: 0px;
}
.logo-text {
    margin-left: 10px; /* Ajuste o espaçamento conforme necessário */
    font-size: 28px;
	color: white;
	margin-top: -8px;
  }
</style>
