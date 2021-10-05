import { createRouter, createWebHistory } from "vue-router";
import Top from "../views/Top.vue";
import New from "../views/New.vue";
import ProfileDetail from "../views/ProfileDetail.vue";
import Profile from "../views/Profile.vue";
import Commnet from "../views/Comment.vue";

const routes = [
  {
    path: "/",
    name: "Top",
    component: Top,
  },
  {
    path: "/top",
    redirect: "/",
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
  {
    path: "/comment/:id",
    name: "Comment",
    component: Commnet,
    props: true,
  },
];

const router = createRouter({
  base: process.env.NODE_ENV === "production" ? "/Hacker-News-Demo" : "",
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
