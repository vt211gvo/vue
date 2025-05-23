import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Items from "../components/Items.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresGuest: true },
  },
  {
    path: "/items",
    name: "Items",
    component: Items,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next();
      } else {
        next({ name: "Login" });
      }
    });
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next({ name: "Items" });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

export default router;
