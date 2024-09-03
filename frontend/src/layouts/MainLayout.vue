<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          Full-Stack Project CRUD Libros y Autores
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          CRUD
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';
import { onBeforeMount, ref} from 'vue';
import { useAuthorStore } from '../stores/authorsStore';
import { Author, Book } from '../components/models';
import { useBooksStore } from '../stores/booksStore';
import api from 'axios'

defineOptions({
  name: 'MainLayout'
});

const leftDrawerOpen = ref(false);
const linksList: EssentialLinkProps[] = [
  {
    title: 'Libros',
    caption: 'Lista de libros',
    icon: 'book',
    link: '/books'
  },
  {
    title: 'Autores',
    caption: 'Lista de autores',
    icon: 'person',
    link: '/authors'
  }
];
const authorsStore = useAuthorStore();
const authors = ref<Author[]>([]);
const booksStore = useBooksStore();
const books = ref<Book[]>([]);
function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
onBeforeMount(async () => {
  console.log(api)
  await booksStore.fetchBooks();
  books.value = booksStore.books;
  await authorsStore.fetchAuthors();
  authors.value = authorsStore.authors;
});
</script>
