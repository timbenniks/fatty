import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueAnalytics from "vue-analytics";
import TrendChart from "vue-trend-chart";

Vue.config.productionTip = false;

import "@/styles/index.scss";

Vue.use(VueAnalytics, {
  id: "UA-6797812-7",
  router
});

Vue.use(TrendChart);

new Vue({
  router,
  store,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event("x-app-rendered"))
}).$mount("#app");
