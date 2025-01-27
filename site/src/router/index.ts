import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import DashboardView from "@/views/DashboardView.vue";
import store from "@/store";
import OrderComponent from "@/components/dashboard/OrderComponent.vue";
import LoginAdminView from "@/views/LoginAdminView.vue";

NProgress.configure({ showSpinner: true });
const reservedRoutes = ["/dashboard"];
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      title: "Onfly - Login",
    },
  },
  {
    path: "/login-admin",
    name: "login-admin",
    component: LoginAdminView,
    meta: {
      title: "Onfly - Login administrativo",
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    meta: {
      title: "Onfly - Minha conta",
    },
    children: [{ path: "", component: OrderComponent, name: "order" }],
  },
];

const isAuthenticated = () => {
  const user = store.getters.getUser;

  if (
    !user ||
    !user.user ||
    !localStorage.getItem(process.env.VUE_APP_JWT_NAME)
  ) {
    return false;
  }

  return true;
};
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (
    !isAuthenticated() &&
    to.name !== "login" &&
    to.name !== "login-admin" &&
    to.name !== "signup" &&
    reservedRoutes.includes(to.path as string)
  ) {
    return next({ name: "home" });
  }

  document.title = (to.meta.title as string) || "Default Title";
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
