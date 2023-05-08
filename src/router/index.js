import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Register from '../views/RegisterView.vue';
import Login from '../views/LoginView.vue';
import Guard from '../services/middleware';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/requests',
    name: 'requests',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "requests" */ '../views/RequestsView.vue'),
    beforeEnter: Guard.beforeAuth
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: Guard.afterAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: Guard.afterAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
