import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Auth0Plugin } from "./auth";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/github.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { domain, clientID_production, clientID_test, audience } from "../auth_config.json";

Vue.config.productionTip = false;
var clientId = "";
if (process.env.NODE_ENV === 'development')
  clientId = clientID_test;
else 
  clientId = clientID_production;

if (process.env["REGISTRY_API_ENDPOINT"] !== undefined)
  axios.defaults.baseURL = process.env["REGISTRY_API_ENDPOINT"];

Vue.use(hljs.vuePlugin);

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

library.add(faLink, faUser, faPowerOff);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
