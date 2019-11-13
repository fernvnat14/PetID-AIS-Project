import Vue from "vue";
import firebase from "firebase";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/post",
    name: "post",
    component: () => import("../views/Post.vue")
  },
  {
    path: "/petid",
    name: "petid",
    component: () => import("../views/Profile.vue")
  },
  {
    path: "/formuser",
    name: "formuser",
    component: () => import("../views/vFormuser.vue")
  },
  {
    path: "/formpetid",
    name: "formpetid",
    component: () => import("../views/vFormpetid.vue")
  },
  {
    path: "/petcard",
    name: "petcard",
    component: () => import("../views/vPetid.vue")
  },
  {
    path: "/formvets",
    name: "formvets",
    component: () => import("../views/VFormvet.vue")
  },
  {
    path: "/vetscard",
    name: "vetscard",
    component: () => import("../views/VVets.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next("/login");
  else if (requiresAuth && currentUser) next();
  else next();
});
export default router;
