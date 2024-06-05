<template>
	<Trumbowyg
		:value="value"
		@input="$emit('input', $event)"
		:config="config"
		class="form-control"
		:placeholder="placeholder"
		/>
</template>

<script>

	import Trumbowyg from "vue-trumbowyg";

	import "trumbowyg/dist/plugins/colors/ui/trumbowyg.colors.min.css";

	import "trumbowyg/dist/plugins/table/ui/trumbowyg.table.min.css";

	import "trumbowyg/dist/ui/trumbowyg.min.css";

	import "trumbowyg/dist/langs/pt_br.min.js";

	import "trumbowyg/dist/plugins/base64/trumbowyg.base64.min.js";

	import "trumbowyg/dist/plugins/colors/trumbowyg.colors.min.js";

	import "trumbowyg/dist/plugins/fontfamily/trumbowyg.fontfamily.min.js";

	import "trumbowyg/dist/plugins/fontsize/trumbowyg.fontsize.min.js";

	import "trumbowyg/dist/plugins/history/trumbowyg.history.min.js";

	import "trumbowyg/dist/plugins/indent/trumbowyg.indent.min.js";

	import "trumbowyg/dist/plugins/insertaudio/trumbowyg.insertaudio.min.js";

	import "trumbowyg/dist/plugins/pasteembed/trumbowyg.pasteembed.min.js";

	import "trumbowyg/dist/plugins/resizimg/trumbowyg.resizimg.min.js";

	import "trumbowyg/dist/plugins/table/trumbowyg.table.min.js";

	import "trumbowyg/dist/plugins/upload/trumbowyg.upload.min.js";

	import "mathjax/MathJax.js";

	import "mathjax/config/TeX-AMS_HTML.js";

	import "trumbowyg/dist/plugins/mathml/trumbowyg.mathml.min.js";

	/*	Exportanto todos os dados	*/
	export default {
		name: "RichTextEditor",
		props: {
			placeholder: {
				type: String,
				default: "Digite...",
			},
			value: {
				required: true,
			},
		},
		data(){
			return {
				config: {
					lang: "pt_br",
					resetCss: true,
					tagsToRemove: ["script"],
					autogrow: true,
					removeformatPasted: true,
					btnsDef: {
						// Create a new dropdown
						image: {
							dropdown: ["insertImage", "base64"],
							ico: "insertImage",
						},
					},
					btns: [
						["viewHTML"],
						["formatting"],
						["historyUndo", "historyRedo"],
						["fontsize"],
						["foreColor", "backColor"],
						["strong", "em", "del", "underline"],
						["superscript", "subscript"],
						["link"],
						["indent", "outdent"],
						["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
						["unorderedList", "orderedList"],
						["horizontalRule"],
						["table"],
						["removeformat"],
						["fullscreen"],
						["image"],
						["insertAudio"],
						["mathml"],
					],
					plugins: {
						fontsize: {
							allowCustomSize: false,
							sizeList: [
								"10px", "11px", "12px", "14px", "16px",
							],
						},
						colors: {
							colorList: [
								"FFFFFF", "C0C0C0", "808080", "333333 ", "000000", "FF0000", "800000", "FF6600", "FFFF00", "F7B529 ",
								"808000", "179C52", "00FF00", "008000", "00FFFF", "008080", "0000FF", "000080", "FF00FF", "6600FF", "800080",
							],
						},
					},
				},
			};
		},
		components: {
			Trumbowyg,
		},
		mounted(){
			// eslint-disable-next-line no-undef
			MathJax.Hub.Config({
				tex2jax: {
					inlineMath: [
						["$", "$"],
						["\\(", "\\)"],
					],
				},
			});
		},
	};
</script>

<style lang="css" scoped>

	/*	Estilização do trumbowyg	*/
	* :deep(.trumbowyg-button-pane) {
		z-index: 0;
	}

	* :deep(.trumbowyg-editor.trumbowyg-reset-css blockquote) ,
	* :deep(.trumbowyg-editor.trumbowyg-reset-css div) ,
	* :deep(.trumbowyg-editor.trumbowyg-reset-css ol) ,
	* :deep(.trumbowyg-editor.trumbowyg-reset-css p) ,
	* :deep(.trumbowyg-editor.trumbowyg-reset-css ul) {
		font-family: Arial,'Times New Roman', Times, serif!important;
	}

	/*	---------------------------------------------------------------- 	*/
	* :deep(.trumbowyg-button-pane) {
		background-color: var(--cor-primaria-200);
	}

	* :deep(.trumbowyg-editor) {
		border-radius: 15px;
	}
	/*	---------------------------------------------------------------- 	*/
</style>
