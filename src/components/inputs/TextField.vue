<template>
	<FieldWrapper :label="label" v-bind="$attrs">
		<!-- INPUT MASCARADO SIMPLES-->
		<v-text-field
			density="compact"
			variant="outlined"
			color="primary"
			dense
			hide-details="auto"
			v-bind="$attrs">
			<template v-for="(_, someOtherName) in $slots" v-slot:[someOtherName]>
				<slot :name="someOtherName"/>
			</template>
		</v-text-field>
	</FieldWrapper>
</template>

<script>

	import FieldWrapper from "@/components/inputs/FieldWrapper.vue";

	export default {

		name: "TextdField",
		components: { FieldWrapper },
		data(){
			return {
			};
		},
		props: {
			label: String,
		},
	};
</script>
