import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import daybookRouter from '@/modules/daybook/router/index'
import ahutRouter from '@/modules/auth/router/index'
import isAuthenticatedGuard from '@/modules/auth/router/auth-guard'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/daybook',
    beforeEnter: [isAuthenticatedGuard],
    ...daybookRouter
  },
  {
    path: '/ahut',
    ...ahutRouter
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
