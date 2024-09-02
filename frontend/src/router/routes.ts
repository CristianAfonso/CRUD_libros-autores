import { useAuthorStore } from 'src/stores/authorsStore';
import { useBooksStore } from 'src/stores/booksStore';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/BooksTable.vue'), name: 'Books',
        props: () => ({
          books: useBooksStore().books
        }) 
      },
      { path: 'authors', component: () => import('pages/AuthorsTable.vue'), name: 'Authors',
        props: () => ({
          authors: useAuthorStore().authors
        })  
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
