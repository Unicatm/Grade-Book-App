import { registerPlugins } from "@/plugins";

import App from "./App.vue";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from "./stores/auth";
import router from "./router/index.js";

import "unfonts.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

registerPlugins(app);

const authStore = useAuthStore();
authStore.checkAuth();

app.mount("#app");
