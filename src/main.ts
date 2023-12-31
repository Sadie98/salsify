import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

// it's js library, no types there
// @ts-ignore
import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(BootstrapVue3);

app.mount("#app");
