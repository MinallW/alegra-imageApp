import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SearchResults from '../views/SearchResults.vue';
import Invoice from '../views/Invoice.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/search/:tag',
    name: 'searchResults',
    component: SearchResults,
    props: true,
  },
  {
    path: '/invoice/:id',
    name: 'Invoice',
    component: Invoice,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes,
});

export default router;
