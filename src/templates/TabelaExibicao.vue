<template>
	<EasyDataTable
		:item-key="itemKey"
		loading-text="Carregando..."
		@page-count="pageCount=$event"
		:loading="loading"
		:disabled="disabled"
		v-model:page="page"
		:items-per-page="10"
		:headers="headersComputed"
		class="my-2"
		v-bind:class="{'row-pointer':rowPointer}"
		:footer-props="{disablePagination:loading || disabled, disableItensPerPage:loading || disabled, itemsPerPageOptions:itemsPerPageOptions}"
		v-bind="$attrs"
		>
		<template v-slot:top>
			<span class="title">{{descricaoLista}} </span>
		</template>
		<template v-for="(_, someOtherName) in $slots" v-slot:[someOtherName]>
			<slot :name="someOtherName"/>
		</template>
		<template #item-actions="item">
			<v-tooltip location="bottom" v-if="actionButtons && actionButtons.editar">
				<template v-slot:activator="{ props }">
					<div class="d-flex"> <!-- Adicionando a classe 'd-flex' para criar um contêiner flexível -->
						<v-btn
							class="small rounded-0"
							icon
							v-bind="props"
							:disabled="loading || disabled"
							@click.stop="$emit('editar', item)"
							>
							<v-icon
								small
								color="var(--cor-primaria-100)"
								>
								mdi-pencil
							</v-icon>
						</v-btn>
						<v-btn
							class="small rounded-0"
							icon
							v-bind="props"
							:disabled="loading || disabled"
							@click.stop="$emit('delete', item)"
							>
							<v-icon
								small
								color="var(--cor-primaria-100)"
								>
								mdi-delete
							</v-icon>
						</v-btn>
					</div>
				</template>
			</v-tooltip>
		</template>
	</EasyDataTable>
</template>
<script>

	export default {
		name: "TabelaExibicao",
		props: {
			loading: {
				default: false,
				required: false,
				type: Boolean,
			},
			disabled: {
				default: false,
				required: false,
				type: Boolean,
			},
			descricaoLista: {
				required: false,
			},
			headers: {
				required: false,
			},
			itemKey: {
				required: false,
				default: "index",
			},
			rowPointer: {
				required: false,
				default: false,
				type: Boolean,
			},
			actionButtons: {
				required: false,
				type: Object,
			},
		},
		data(){
			return {
				pageCount: 0,
				page: this.paginaAtual,
				itemsPerPageOptions: [
					10,
					15,
					20,
					50,
				],
			};
		},
		computed: {
			headersComputed(){
				return !this.actionButtons
					? this.headers
					:	[
						...this.headers,
						{
							text: "Ações",
							align: "center",
							width: "100",
							sortable: false,
							value: "actions",
						},
					];
			},
		},
		watch: {
			paginaAtual(pagina){
				this.page = pagina;
			},
			page(pagina){
				this.$emit("update:paginaAtual", pagina);
				this.$emit("page-change", pagina);
				this.$emit("pesquisar-paginado", {
					paginaAtual: pagina,
				});
			},
		},
	};
</script>
<style scoped>
		.simple-table > div{
		}
		.simple-table table thead{
			background-color: var(--cor-secundaria-100);
		}
		.simple-table table thead tr th{
			height: 32px!important;
			color: white !important;
		}
		.simple-table table tbody tr td{
			padding: 12px 6px 12px 6px!important;
			border-bottom:1px solid var(--cor-terciaria-300)!important;
		}
* :deep(.v-data-table .v-data-table__wrapper){
	border-top-right-radius: 5px ;
	border-top-left-radius: 5px ;
}
* :deep(.v-data-table table thead){
			background-color: var(--cor-secundaria-100);
}
* :deep(.v-data-table .v-data-table-header tr th) {
  height: 32px !important;
	color: white !important;
	padding: 4px 6px!important;
}
* :deep(.v-data-table tbody tr td) {
	padding: 12px 6px 12px 6px!important;
	border-bottom:1px solid var(--cor-terciaria-300)!important;
}
</style>
