<template>
  <q-page class="row items-center justify-evenly">
    <BookCard v-for="book in booksStore.$state.books" :key="book.id" :book="book"/>
  </q-page>
</template>

<script setup lang="ts">
import BookCard from 'components/BookCard.vue';
import { useBooksStore } from '../stores/booksStore';
import { onMounted } from 'vue';

defineOptions({
  name: 'IndexPage'
});

const booksStore = useBooksStore();

onMounted(() => {
  booksStore.fetchBooks();
  console.log(booksStore.$state)
});
</script>
