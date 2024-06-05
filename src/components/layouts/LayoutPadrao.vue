<template>
	<v-app class="bg-surface">
		<AppBar />
		<v-main class="v-main" style="--v-layout-left: 0px; --v-layout-right: 0px; --v-layout-top: 10px; --v-layout-bottom: 0px;">
			<v-container fluid class="pa-8 custom-container">
				<v-row class="flex-container">
					<div class="sidebar">
						<BarraLateral />
					</div>
					<div class="content">
						<router-view/>
					</div>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
	import AppBar from "@/components/navegacao/AppBar.vue";
	import BarraLateral from "@/components/navegacao/BarraLateral.vue";

	export default {
		components: {
			AppBar,
			BarraLateral,
		},
	};
</script>

<style scoped>
	.custom-container {
		min-height: 100vh;
		background: #ECF1F0;
	}

	.flex-container {
		display: flex;
		flex-wrap: nowrap;
	}

	div :deep(.content){
		flex: 1;
		background: white;
		border-radius:20px;
		min-height: 90vh;
		min-height: 90vh;
		margin-left: 16px;
		padding: 16px;
		overflow: hidden;
	}
	.sidebar {
		flex: 0 0 auto;
		background-color: white;
		padding: 16px;
		border-radius: 20px;
		max-width: 250px;
	}
	.element.style {
    --v-layout-left: 0px;
    --v-layout-right: 0px;
    --v-layout-top: 0px;
    --v-layout-bottom: 0px;
}
</style>
