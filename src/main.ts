import Vue from 'vue';
import App from './App.vue';
import { RenderPlugin } from "./render";
import axios from "axios";
import './registerServiceWorker';
import router from './router';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import polyfills from "./polyfills";
import VueCookies from 'vue-cookies';
import { ExtensionsPlugin } from "./extensions";
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";
import VueMeta from 'vue-meta';
import * as Panelbear from '@panelbear/panelbear-js';
import firebase from "./firebase";
import store from "./state";

firebase.beforeInstall();

Panelbear.load('ICD6yJpIniJ');
Panelbear.trackPageview();

import { domain, clientID_production, clientID_test, audience } from "../auth_config.json";

Vue.config.productionTip = false;

let isDevelopment = process.env.NODE_ENV === 'development';
polyfills();

var clientId = "";
if (isDevelopment)
  clientId = clientID_test;
else
  clientId = clientID_production;

if (process.env["REGISTRY_API_ENDPOINT"] !== undefined)
  axios.defaults.baseURL = process.env["REGISTRY_API_ENDPOINT"];

let app: Vue | null = null;

/*Vue.use(Auth0Plugin as any, {
  domain,
  clientId,
  audience,
  onRedirectCallback: (_) => {
    app?.$loader.open();
    window.location.href = "/";
  }
});*/

Vue.use(firebase.plugin, {});
Vue.use(VueCookies);
Vue.use(Vuesax, {});
Vue.use(ExtensionsPlugin, {});
Vue.use(RenderPlugin, {});
Vue.use(VueMeta);

Sentry.init({
  Vue,
  dsn: "https://9fc61ca8d8104cde8e1b1edbfcf6ee39@o1093028.ingest.sentry.io/6112114",
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost", "vein.gallery", /^\//],
    }),
  ],
  tracesSampleRate: 1.0,
  debug: isDevelopment,
  logErrors: true,
  enabled: !isDevelopment
});

app = new Vue({
  router,
  store,
  render: h => h(App)
});
app.$mount('#app');

app.$loader.setLoaderCtor(() => app?.$vs.loading({
  target: app.$refs.app,
  scale: '0.6',
  background: 'warn',
  type: 'gradient',
  opacity: 1,
  color: '#fff'
}));
app.$loader.open();



if (isDevelopment) (window as any).app = app;
