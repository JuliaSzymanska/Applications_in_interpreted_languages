/*jshint esversion: 6 */
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  // {
  //   path: '/registration',
  //   name: 'Registration',
  //   component: () => import('../views/Registration.vue')
  // },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    redirect: {
      name: 'Home'
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
