import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'topNews',
      component: () => import('../views/TopPage.vue'),
    },
    {
      path: '/new',
      name: 'newPage',
      component: () => import('../views/NewPage.vue'),
    },
    {
      path: '/best',
      name: 'bestPage',
      component: () => import('../views/BestPage.vue'),
    },
    {
      path: '/show',
      name: 'showPage',
      component: () => import('../views/ShowPage.vue'),
    },
    {
      path: '/ask',
      name: 'askPage',
      component: () => import('../views/AskPage.vue'),
    },
    {
      path: '/jobs',
      name: 'jobsPage',
      component: () => import('../views/JobsPage.vue'),
    },
    {
      path: '/user/:userid',
      name: 'userPage',
      component: () => import('../views/UserPage.vue'),
    },
    {
      path: '/news/:newsid/details',
      name: 'newsDetails',
      component: () => import('../views/NewsDetails.vue'),
    },
    {
      path: '/show/:newsid/details',
      name: 'showDetails',
      component: () => import('../views/ShowDetails.vue'),
    },
    {
      path: '/ask/:newsid/details',
      name: 'askDetails',
      component: () => import('../views/AskDetails.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/AskDetails.vue'),
    },
  ],
})

export default router
