import { createRouter, createWebHistory } from "vue-router";
import Top from "../views/Top.vue";
import New from "../views/New.vue";

const routes = [
  {
    path: "/",
    name: "Top",
    component: Top,
  },
  {
    path: "/new",
    name: "New",
    component: New,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
