<template>
	<label class="text-field" v-if="comLabel">
		<span >
			<template v-if="label">
				{{ label }}
			</template>
			&nbsp;
		</span>
		<slot />
	</label>
	<span v-else>
		<span >
			<template v-if="label">
				{{ label }}
			</template>
			&nbsp;
		</span>
		<slot />
	</span>
</template>

<script>
	export default {
		name: "FieldWrapper",
		props: {
			label: String,
			comLabel: {
				type: Boolean,
				default: true,
			},
		},
	};
</script>

<style scoped>
.text-field:not(.checkbox) {
	width: 100%;
}
.text-field :deep(.v-field__outline){
	--v-field-border-width: 2px;
	--v-field-border-opacity: 1;
}
.text-field span{
	font-size: 16px;
	font-family: Poppins;
	font-style: normal;
	font-weight: 600;
	line-height: 20px;
}
</style>
