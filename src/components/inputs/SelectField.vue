<template>
	<SelectWrapper :label="label" v-bind="$attrs">
		<v-select
			class="custom-field"
			density="compact"
			variant="outlined"
			color="primary"
			dense
			hide-details="auto"
			v-bind="$attrs">
			<template v-for="(_, someOtherName) in $slots" v-slot:[someOtherName]>
				<slot :name="someOtherName"/>
			</template>
		</v-select>
	</SelectWrapper>
</template>

<script>

	import SelectWrapper from "@/components/inputs/SelectWrapper.vue";

	export default {

		name: "SelectField",
		components: { SelectWrapper },
		data(){
			return {
			};
		},
		props: {
			label: String,
		},
	};
</script>
