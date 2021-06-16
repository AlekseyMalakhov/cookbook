import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import CreateAccount from '../views/CreateAccount.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/create_account',
    name: 'CreateAccount',
    component: CreateAccount
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
