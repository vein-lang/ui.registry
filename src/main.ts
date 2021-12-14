import Vue from 'vue';
import App from './App.vue';
import { Auth0Plugin } from "./auth";
import { RenderPlugin } from "./render";
import axios from "axios";
import './registerServiceWorker';
import router from './router';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import polyfills from "./polyfills";
import { ExtensionsPlugin } from "./extensions";

import * as Panelbear from '@panelbear/panelbear-js';

Panelbear.load('ICD6yJpIniJ');
Panelbear.trackPageview();


import { domain, clientID_production, clientID_test, audience } from "../auth_config.json";

Vue.config.productionTip = false;

polyfills();

var clientId = "";
if (process.env.NODE_ENV === 'development')
  clientId = clientID_test;
else
  clientId = clientID_production;

if (process.env["REGISTRY_API_ENDPOINT"] !== undefined)
  axios.defaults.baseURL = process.env["REGISTRY_API_ENDPOINT"];

Vue.use(Auth0Plugin as any, {
  domain,
  clientId,
  audience,
  onRedirectCallback: (appState: any) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.use(Vuesax, {});
Vue.use(ExtensionsPlugin, {});
Vue.use(RenderPlugin, {});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
