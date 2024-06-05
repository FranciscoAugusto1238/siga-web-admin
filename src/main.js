import { createApp } from 'vue';
import App from './App.vue';
import ButtonDefault from "@/components/buttons/ButtonDefault.vue";
import TextField from "@/components/inputs/TextField.vue";
import TabelaExibicao from "@/templates/TabelaExibicao.vue";
import Container from "@/templates/containerComponent.vue";
import { createPinia } from "pinia";
import "sweetalert2/dist/sweetalert2.min.css";
import VueTheMask from "vue-the-mask";
import Vue3EasyDataTable from "vue3-easy-data-table";
import vuetify from "./plugins/vuetify.js";
import router from "./router/index.js";
import "vue-search-select/dist/VueSearchSelect.css";
import "vue3-easy-data-table/dist/style.css";
import "vuetify/dist/vuetify.min.css";
import "./styles/main.css";
import prototypes from "./plugins/prototypes.js";
import store from './store'

const pinia = createPinia();

const app = createApp(App);
app.component("text-field", TextField);
app.use(pinia);
app.use(vuetify);
app.use(router);
app.use(store);
app.use(VueTheMask);
app.component("a-btn", ButtonDefault);
app.component("tabela-exibicao", TabelaExibicao);
app.component("a-container", Container);
app.component("EasyDataTable", Vue3EasyDataTable);
Object.assign(app.config.globalProperties, prototypes);

app.mount('#app');
