import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { authGuard } from "../auth";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/maintenance',
    name: 'Maintenance',
    component:() => import(/* webpackChunkName: "maintenance" */ '../views/Maintenance.vue'),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    beforeEnter: authGuard
  },
  {
    path: "/package/:id/:version",
    name: "PackageView",
    component: () => import(/* webpackChunkName: "packageView" */ '../views/PackageView.vue'),
  },
  {
    path: "/license/",
    name: "PrivacyPolicy",
    component: () => import(/* webpackChunkName: "privacyPolicy" */ '../views/PrivacyPolicy.vue'),
  }
];

const router = new VueRouter({
  routes
});

export default router;
