import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import dashboard from "./modules/dashboard";

Vue.use(Vuex);
const store = new Vuex.Store({
  strict: true,
  modules: {
    auth: auth,
    dashboard: dashboard,
  },
});

export default store;
