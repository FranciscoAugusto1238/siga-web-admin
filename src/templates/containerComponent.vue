<template>

	<div
		elevation="0"
		class="main-content"
		>

		<v-container>
			<v-row justify="space-between">
				<v-col cols="auto">
					<header
						class="header-page"
						>
						<h4 class="text-h4 mb-10">{{title}}</h4>
					</header>
				</v-col>
				<v-col cols="auto" align="end">
					<slot name="botoes-titulo" />
				</v-col>
			</v-row>
		</v-container>

		<v-sheet
			class="content"
			>
			<v-card
				class="box-menu"
				elevation="0"
				>
				<v-container class="mb-6">
					<slot/>
				</v-container>
			</v-card>
		</v-sheet>
	</div>
</template>

<script>

	/*   Exports   */
	export default {
		name: "containerComponent",
		props: {
			title: String,
		},
	};
</script>

<style scoped>

		/*	Estilização o container principal da pagina 576px	*/
		.main-content:deep() {
			width: 100%;
			height: 100vh;
				margin: 0px;
				padding-top: 2rem;
			background-color: var(--cor-branca);
		}

		/*	---------------------------------------------------------------- 	*/

		/*	Estilização o titulo da pagina 576px	*/
		.header-page {
			padding: 0.5rem 0;
			margin-bottom: 0.7rem;
		}

	@media (min-width: 576px) {

		/*	Estilização o container principal da pagina 576px	*/
		.main-content:deep() {
			width: 100%;
			margin: 0px;
			padding-top: 2rem;
			background-color: var(--cor-branca);
		}

		/*	---------------------------------------------------------------- 	*/

		/*	Estilização o titulo da pagina 576px	*/
		.header-page {
			padding: 0.5rem  0;
			margin-bottom: 0.7rem;
		}

	}

	@media (min-width: 768px) {

		/*	Estilização o container principal da pagina 768px	*/
		.main-content:deep() {
			width: 100%;
			margin: 0px;
			padding-top: 2rem;
			padding-left: 3rem;
			padding-right: 3rem;
			background-color: var(--cor-branca);
		}

		/*	---------------------------------------------------------------- 	*/

		/*	Estilização o titulo da pagina 768px	*/
		.header-page {
			padding: 0.5rem  0;
			margin-bottom: 0.7rem;
		}

	}

	@media (min-width: 992px) {

		/*	Estilização o container principal da pagina 992px	*/
		.main-content:deep() {
			width: 100%;
			height: 100vh;
			margin: 0px;
			padding-top: 2rem;
			padding-left: 0.2rem;
			padding-right: 0.2rem;
			border-radius: 30px 0px 30px 0px;
			background-color: var(--cor-branca);
		}

		/*	---------------------------------------------------------------- 	*/

		/*	Estilização o titulo da pagina 992px	*/
		.header-page {
			padding: 0.5rem  0;
			margin-bottom: 0.7rem;
		}

	}

	@media (min-width: 1200px) {

		/*	Estilização o container principal da pagina 1200px	*/
		.main-content:deep() {
			width: 100% !important;
			height: 100%;
			margin: 0px;
			padding-top: 3rem;
			padding-left: 3rem;
			padding-right: 2rem;
			border-radius: 30px 0px 0px 30px;
			background-color: var(--cor-branca);
		}

		/*	---------------------------------------------------------------- 	*/

		/*	Estilização o titulo da pagina 1200px	*/
		.header-page {
			padding: 0.5rem  0;
			margin-bottom: 0.7rem;
		}
	}
</style>
