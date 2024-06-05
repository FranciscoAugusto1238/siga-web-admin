<template>
	<v-list class="lista-menu" nav>
		<template v-for="(menu,index) in menus">
			<v-list-item v-if="!menu.items"  :key="index+'menu-item'" :prepend-icon="menu.icone" :title="menu.titulo" @click="onClickMenu(menu)" />
			<v-list-group :key="index+'menu-group'" v-else>
				<template v-slot:activator="{ props }">
					<v-list-item
						v-bind="props"
						:prepend-icon="menu.icone"
						:title="menu.titulo"
						/>
				</template>

				<v-list-item
					class="submenu"
					v-for="(submenu, indexSubmenuItem) in menu.items"
					:key="indexSubmenuItem+'submenu-item'"
					:value="submenu.titulo"
					:title="submenu.titulo"
					@click="onClickMenu(submenu)"
					/>
			</v-list-group>
		</template>
	</v-list>
</template>

<script>
	export default {
		props: {
			menus: {
				type: Array,
				required: true,
			},
		},
		methods: {
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

<style lang="scss" scoped>
	.lista-menu{
		padding: 0;

		&:deep(.v-list-item--nav .v-list-item-title){
			color: #414147;
			font-size: 16px;
			font-style: normal;
			font-weight: 600;
			line-height: 20px;
		}
		&:deep(.v-list-item--nav .v-list-item__prepend .v-icon),
		&:deep(.v-list-item--nav .v-list-item__append .v-icon){
			color: #414147;
			opacity: 1;
		}

		&:deep(.submenu){
			.v-list-item--nav .v-list-item__content {
			text-align: left;
		}

		& .v-list-item-title {
			color: #636363;
			opacity: 1;
		}
		}
	}
	.element.style {
    --v-layout-left: 0px;
    --v-layout-right: 0px;
    --v-layout-top: 0px;
    --v-layout-bottom: 0px;
}
</style>
