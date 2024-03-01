import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'topNews',
      component: () => import('@/views/TheNews.vue'),
    },
    {
      path: '/:type',
      name: 'newPage',
      component: () => import('@/views/TheNews.vue'),
    },
    {
      path: '/user/:userid',
      name: 'userPage',
      component: () => import('@/views/UserPage.vue'),
    },
    {
      path: '/news/:newsid',
      name: 'newsDetails',
      component: () => import('@/views/NewsDetails.vue'),
    },
    {
      path: '/show/:newsid',
      name: 'showDetails',
      component: () => import('@/views/NewsDetails.vue'),
    },
    {
      path: '/ask/:newsid',
      name: 'askDetails',
      component: () => import('@/views/AskDetails.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFount.vue'),
    },
  ],
})

export default router
