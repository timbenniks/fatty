import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/progress",
    name: "progress",
    component: () =>
      import(/* webpackChunkName: "progress" */ "../views/Progress.vue")
  },
  {
    path: "/thanks",
    name: "thanks",
    component: () =>
      import(/* webpackChunkName: "thanks" */ "../views/Thanks.vue")
  },
  {
    path: "/error",
    name: "error",
    component: () =>
      import(/* webpackChunkName: "error" */ "../views/Error.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
