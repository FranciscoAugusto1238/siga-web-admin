<template>
	<label class="select-field" v-if="comLabel">
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
		name: "SelectWrapper",
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
.select-field:not(.checkbox) {
	width: 100%;
}
.select-field :deep(.v-field__outline){
	--v-field-border-width: 2px;
	--v-field-border-opacity: 1;
}
.select-field span{
	font-size: 16px;
	font-family: Poppins;
	font-style: normal;
	font-weight: 600;
	line-height: 20px;
}
</style>
