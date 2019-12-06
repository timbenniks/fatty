import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueAnalytics from "vue-analytics";

Vue.config.productionTip = false;

import "@/styles/index.scss";

Vue.use(VueAnalytics, {
  id: "UA-6797812-7",
  router
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
