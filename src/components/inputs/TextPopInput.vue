<template>
	<v-dialog v-model="dialogoInterno">
		<v-card class="content">
				<slot></slot>
				<v-row justify="center" align="center">
					<v-col cols="12" lg="6">
							<v-btn 
								block
								@click="fechar" 
								dark 
								color="red" 
								class="white--text" 
								style="margin-top: 20px;"
							>
								Cancelar
							</v-btn>
					</v-col>
				</v-row>
		</v-card>
	</v-dialog>
</template>
<script>
//import TextField from './TextField.vue';
export default {
	components: {  },
	name: "TextPopInput",
	data(){
		return {
			dialogoInterno: false,
		}
	},
	methods: {
		fechar() {
			this.$emit('close');
		}
	}
}
</script>
<style scoped>
.content{
	padding: 50px 20px;
	min-width: 50%;
	border-radius: 20px;
	margin: auto;
}
</style>


