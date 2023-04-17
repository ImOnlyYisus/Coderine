import { createApp } from "vue";

import App from "./src/App.vue";
import router from "./src/router";
import VueSplit from "../../node_modules/vue3-split-panel/src/index";

import "./src/assets/styles/css/import.css";

const app = createApp(App);

app.use(router);
app.use(VueSplit);

app.mount("#app");
