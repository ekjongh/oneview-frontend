import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VuetifyDialog from "vuetify-dialog";
import "vuetify-dialog/dist/vuetify-dialog.css";
import axios from "axios";
import VueCookies from "vue-cookies";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);

import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);
Vue.component("apexChart", VueApexCharts);

Vue.use(VueCookies);
Vue.$cookies.config("7d");
// axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.xsrfHeaderName = "X-CSRFToken";
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "http://localhost:8000/"; // the FastAPI backend
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

Vue.use(VuetifyDialog, {
  context: {
    vuetify,
  },
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
