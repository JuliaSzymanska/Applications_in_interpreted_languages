import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  // {
  //   path: '/registration',
  //   name: 'Registration',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Registration.vue')
  // },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  // },
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
    // TODO: add page not found page
    redirect: '/'
  }
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
