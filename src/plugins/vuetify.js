// Vuetify
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import { VDataTable } from "vuetify/labs/VDataTable";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as labsComponents from "vuetify/labs/components";

const vuetify = createVuetify({
	theme: {
		defaultTheme: "light",
		themes: {
			light: {
				dark: false,
				colors: {
					primary: "#1e7c73",
					"primary-lighten-1": "#30a59d",
					"primary-darken-1": "#1e5c58",
					error: "#AE2424",
				},
			},
		},
	},
	components: {
		VDataTable,
		...components,
		...labsComponents,
	},
	directives,
});

export default vuetify;
