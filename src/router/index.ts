import { createRouter, createWebHistory } from 'vue-router'
import UserPage from '@/views/UserPage.vue'
import NewsDetails from '@/views/NewsDetails.vue'
import ShowDetails from '@/views/ShowDetails.vue'
import AskDetails from '@/views/AskDetails.vue'
import NotFound from '@/views/NotFount.vue'
import TheNews from '@/views/TheNews.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'topNews',
      component: TheNews,
    },
    {
      path: '/:type',
      name: 'newPage',
      component: TheNews,
    },
    {
      path: '/user/:userid',
      name: 'userPage',
      component: UserPage,
    },
    {
      path: '/news/:newsid/details',
      name: 'newsDetails',
      component: NewsDetails,
    },
    {
      path: '/show/:newsid/details',
      name: 'showDetails',
      component: ShowDetails,
    },
    {
      path: '/ask/:newsid/details',
      name: 'askDetails',
      component: AskDetails,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

export default router
