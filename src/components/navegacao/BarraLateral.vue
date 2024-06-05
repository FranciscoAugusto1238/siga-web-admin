<template>
	<div>
		<v-main v-if="isMobile">
			<v-container>
				<v-row no-gutters justify="space-between" align="center">
					<v-btn variant="text" large @click.stop="trocarEstadoSidebar()">
						<v-icon>mdi-menu</v-icon>
					</v-btn>
					<v-img :src="logoBranca" max-width="100px" />
				</v-row>
			</v-container>
		</v-main>
		<div class="content" v-if="!drawer">
			<ListaMenu :menus="menus" />
		</div>
		<v-navigation-drawer
			v-else
			:permanent="!isMobile"
			elevation="4"
			:temporary="isMobile"
			v-model="drawerMobile"
			:color="$vuetify.theme.current.dark?'dark':'white'"
			>
			<div class="container">
				<v-img :src="logo" class="imagem" />
			</div>
			<v-list nav>
				<template v-for="(menu, index) in menus">
					<v-list-item
						v-if="!menu.items"
						:key="index + 'menu-item'"
						:prepend-icon="menu.icone"
						:title="menu.titulo"
						@click="onClickMenu(menu)"
						/>
					<v-list-group :key="index + 'menu-group'" v-else>
						<template v-slot:activator="{ props }">
							<v-list-item v-bind="props" :prepend-icon="menu.icone" :title="menu.titulo" />
						</template>

						<v-list-item
							v-for="(submenu, indexSubmenuItem) in menu.items"
							:key="indexSubmenuItem + 'submenu-item'"
							:value="submenu.titulo"
							:title="submenu.titulo"
							:prepend-icon="submenu.icone"
							@click="onClickMenu(submenu)"
							/>
					</v-list-group>
				</template>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
import ListaMenu from "@/components/navegacao/ListaMenu.vue";

	export default {
		name: "BarraLateral",
		props: {
			drawer: {
				type: Boolean,
				default: false,
			},
		},
		components: {
			ListaMenu,
		},
		data(){
			return {
				drawerMobile: false,
				menus: [
					{ titulo: "Página inicial", icone: "mdi-home", to: "/home" },					
					{
						titulo: "Cadastro",
						icone: "mdi-account-group",
						to: "/",
						items: [
							{ titulo: "Reaja",  to: "/cadastro-reaja" },
							{ titulo: "Professor",  to: "/cadastro-professor" },
							{ titulo: "Aluno",  to: "/cadastro-alunos" },
							{ titulo: "Disciplina",  to: "/cadastro-disciplina" },
							{ titulo: "Sala",  to: "/cadastro-sala-aula" },
							{ titulo: "Presença",  to: "/cadastro-presenca" },
							{ titulo: "Aula",  to: "/cadastro-aula" },
							{ titulo: "Matricula",  to: "/cadastro-matricula" },
							{ titulo: "Notas",  to: "/cadastro-notas" },
							{ titulo: "Atividades",  to: "/cadastro-atividade" },
							{ titulo: "Entregas",  to: "/cadastro-entrega" },
							{ titulo: "Mensagem",  to: "/cadastro-mensagem" },




							],
					},
					{
						titulo: "Listar dados",
						icone: "mdi-account-group",
						to: "/",
						items: [
							{ titulo: "Reaja",  to: "/listar-reaja" },
						],
					},
				],
			};
		},
		computed: {
			isMobile(){
				return !this.$vuetify.display.mdAndUp;
			},
		},
		watch: {
			isMobile(value){
				this.verificarIsNavbarMobile(value);
			},
		},
		mounted(){
			this.verificarIsNavbarMobile(this.isMobile);
		},
		methods: {
			verificarIsNavbarMobile(value){
				if(!value){
					this.drawerMobile = true;
				}
			},
			trocarEstadoSidebar(){
				if(this.isMobile){
					this.drawerMobile = !this.drawerMobile;
				}
			},
			onClickMenu(menu){
				console.log(menu);
				if(menu.to){
					this.$router.push(menu.to);
				}
				else{
					menu.click();
				}
			},
		},
	};
</script>
<style scoped>
	.nome-empresa {
		margin-top: 20px; /* Ajuste o valor conforme necessário */
	}
	.v-navigation-drawer:deep() {
		border-top-right-radius: 20px;
		padding-bottom: 56px;
		border: none !important;
	}
	:deep(.v-list){
		background: transparent;
	}
	.container {
		display: flex;
		justify-content: center; /* Centraliza horizontalmente */
		align-items: center; /* Centraliza verticalmente */
	}
	.imagem{
		height: 90px;
		width: 90px;
		margin-top: 25px;
	}
	.element.style {
    --v-layout-left: 0px;
    --v-layout-right: 0px;
    --v-layout-top: 0px;
    --v-layout-bottom: 0px;
}
</style>
