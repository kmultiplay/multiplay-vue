import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createI18n } from "vue-i18n";
import "./index.css";
import { messages } from "./assets/i18n/pl";
import { createPinia } from "pinia";

const i18n = createI18n({
  locale: "pl",
  messages,
});

const pinia = createPinia();

createApp(App).use(router).use(i18n).use(pinia).mount("#app");
