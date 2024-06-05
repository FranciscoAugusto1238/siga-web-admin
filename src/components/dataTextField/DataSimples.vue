<template>
	<v-dialog
		ref="dialog"
		v-model="modal"
		v-model:return-value="date"
		:persistent="persistent"
		width="290px" >
		<template v-slot:activator="{ props }">
			<text-field
				:solo="solo"
				@click:clear="limpar()"
				v-model="dataFormatada"
				:label="label"
				v-bind="props"
				:placeholder="placeholder"
				@input="limpar"
				:prepend-inner-icon="prepend_inner_magnify ? 'mdi-magnify' : ''"
				outlined
				dense
				readonly
				clearable
				/>
		</template>
		<v-date-picker
			color="primary"
			:min="minDate"
			:max="maxDate"
			:show-adjacent-months="true"
			v-model="date"
			@click:save="onClickSave"
			@click:cancel="modal = false"
			:first-day-of-week="0"
			scrollable
		/>
	</v-dialog>
</template>

<script>

	export default {
		name: "DataSimples",
		props: {
			prepend_inner_magnify: {
				type: Boolean,
				default: false,
			},
			label: {
				type: String,
				default: "DD/MM/YYYY",
			},
			placeholder: {
				type: String,
				default: "DD/MM/YYYY",
			},
			solo: {
				type: Boolean,
				default: false,
			},
			persistent: {
				type: Boolean,
				default: true,
			},
		},
    data(){
        return {
            dataFormatada: "",
            modal: false,
            date: "",
        };
    },
    watch: {
        date(newValue) {
            let dateObjeto = new Date(newValue);            
            if(isNaN(dateObjeto.getTime())) {
                this.dataFormatada = "";
            } else {
                let dia = String(dateObjeto.getDate()).padStart(2, '0');
                let mes = String(dateObjeto.getMonth() + 1).padStart(2, '0'); 
                let ano = dateObjeto.getFullYear();
                this.dataFormatada = `${dia}/${mes}/${ano}`;
            }
        }
    },
    methods: {
        onClickSave(){
            this.modal = false;
            this.$emit("date-selected", this.date);
        },
        limpar(){
            this.date = "";
            this.dataFormatada = "";
            this.$emit("input", "");
        },
    },
	};
</script>
