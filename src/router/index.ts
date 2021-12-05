import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import { authGuard } from "../auth";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    beforeEnter: authGuard
  },
  {
    path: "/external-api",
    name: "external-api",
    component: () => import(/* webpackChunkName: "ExternalApi" */ '../views/ExternalApi.vue'),
    beforeEnter: authGuard
  }
];

const router = new VueRouter({
  routes
});

export default router;
