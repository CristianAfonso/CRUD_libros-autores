<template>
  <q-page>
        <q-btn
          v-if="!seeComponent"
          @click="seeComponent = true"
          label="Nuevo Libro"
          color="primary"
          flat
        />
    <BookCardComponent
      v-if="isEditing && seeComponent"
      :book="currentBook"
      @submit="handleSubmit"
      @cancel="handleCancel"
      @delete="handleDelete"
    />
    <BookCardComponent
      v-else-if="seeComponent"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
    <q-table v-if="booksStore.books"
      :rows="booksStore.books"
      :columns="columns"
      row-key="id"
      @row-click="handleRowClick"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BookCardComponent from '../components/BookCardComponent.vue';
import { Book } from '../components/models';
import { useBooksStore } from '../stores/booksStore';
import { useAuthorStore } from '../stores/authorsStore';
import { useAuthorBookStore } from '../stores/authors_booksStore';
import { QTableColumn } from 'quasar';
import api from 'axios';

const booksStore = useBooksStore();
const authorsStore = useAuthorStore();
const authorsBooksStore = useAuthorBookStore();

const columns: QTableColumn[] = [
  { name: 'id', label: 'ID', align: 'left', field: 'id', sortable: true },
  { name: 'title', label: 'Título', align: 'left', field: 'title', sortable: true },
  {  name: 'authors', label: 'Autor(es)', align: 'left', 
      field: (row: Book) => {
        return authorsStore.authors
             ?.map(author => {
               const authorBookRelation = authorsBooksStore.author_book.find(
                 (author_book) => author_book.book_id === row.id && author_book.author_id === author.id
               );

               return authorBookRelation ? author.name : undefined;
             })
             .filter((name): name is string => name !== undefined)
             .join(', ') || 'Anónimo';
      }
  }
];

let seeComponent = ref(false);
const isEditing = ref(false);
let currentBook = ref<Book>();

function handleRowClick(evt: Event, row: Book) {
  seeComponent.value = true;
  currentBook.value = row;
  isEditing.value = true;
}

async function handleSubmit(book: Book) {
  try {
    if (isEditing.value) {
      await api.put(`/books/${book.id}`, book);
    } else {
      await api.post('/books', book);
    }
    handleClose();
  } catch (error) {
    console.error(error);
  }
}
async function handleDelete(book: Book){
  try{
    await api.delete(`/books/${book.id}`);
    handleClose();
  } catch (error) {
    console.error(error);
  }
}
function handleCancel() {
  seeComponent.value = false;
  isEditing.value = false;
  currentBook = ref<Book>();
}
async function handleClose(){
  handleCancel();
  await booksStore.fetchBooks();
}
</script>
