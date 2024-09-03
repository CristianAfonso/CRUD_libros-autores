import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const MainLayout = () => import('layouts/MainLayout.vue');
const BooksTable = () => import('pages/BooksTable.vue');
const AuthorsTable = () => import('pages/AuthorsTable.vue');
const ErrorNotFound = () => import('pages/ErrorNotFound.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: 'books', component: BooksTable, name: 'Books' },
      { path: 'authors', component: AuthorsTable, name: 'Authors' }
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
