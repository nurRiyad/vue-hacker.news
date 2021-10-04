import { createRouter, createWebHistory } from "vue-router";
import Top from "../views/Top.vue";
import New from "../views/New.vue";
import ProfileDetail from "../views/ProfileDetail.vue";
import Profile from "../views/Profile.vue";

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
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    props: true,
  },
  {
    path: "/profile/:id",
    name: "ProfileDetail",
    component: ProfileDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
