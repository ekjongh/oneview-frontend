import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";
// import LoginView from "@/views/LoginView.vue";
import auth from "@/store/modules/auth";

const requireAuth = () => (to, from, next) => {
  console.log(to, from, next);
  if (auth.state.isLogin) {
    return next();
  }
  if (to.name === "TokenAuth") {
    return next();
  }
  next("/error");
};
const requireAdmin = () => (to, from, next) => {
  if (auth.state.isLogin && auth.state.userConfig.isAdmin) {
    return next();
  } else {
    alert("관리자 권한이 필요합니다.");
    next(from);
  }
};

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    beforeEnter: requireAuth(),
  },
  {
    path: "/auth",
    name: "TokenAuth",
    component: () =>
      import(/* webpackChunkName: "map" */ "@/views/TokenAuthView.vue"),
    beforeEnter: requireAuth(),
  },
  {
    path: "/voc",
    name: "voc",
    component: () =>
      import(/* webpackChunkName: "map" */ "@/views/MapAnalysisView.vue"),
    beforeEnter: requireAuth(),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/DashboardView.vue"),
    beforeEnter: requireAuth(),
  },
  {
    path: "/admin",
    name: "admin",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/AdminView.vue"),
    beforeEnter: requireAdmin(),
  },
  {
    path: "/user",
    name: "user",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/UserEditView.vue"),
    beforeEnter: requireAuth(),
  },
  // {
  //   path: "/login",
  //   name: "login",
  //   component: LoginView,
  // },
  // {
  //   path: "/home",
  //   name: "home",
  //   component: HomeView,
  // },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "@/views/AboutView.vue"),
  // },
  // {
  //   path: "/bts",
  //   name: "bts",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "@/views/BtsDetailView.vue"),
  // },
  {
    path: "/fail",
    name: "fail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/AccessFailView.vue"),
  },
  {
    path: "*",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/NotFoundView.vue"),
  },
];

const router = new VueRouter({
  routes,
  // mode: "history",
});

// router.beforeEach((to, from, next) => {
//   const isLogin = auth.state.isLogin;
//   console.log(isLogin);
//   if (auth.state.isLogin) {
//     console.log("Router Login Check Success!");
//     next();
//   } else {
//     next({ name: "login" });
//   }
// });

Vue.use(VueRouter);

export default router;
