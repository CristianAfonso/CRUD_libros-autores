<template>
  <q-page>
        <q-btn
          v-if="!seeComponent"
          @click="seeComponent = true"
          label="Nuevo Autor"
          color="primary"
          style="margin: 25px;"
        />
    <AuthorCardComponent
      v-if="isEditing && seeComponent"
      :author="currentAuthor"
      @submit="handleSubmit"
      @cancel="handleCancel"
      @delete="handleDelete"
    />
    <AuthorCardComponent
      v-else-if="seeComponent"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
    <q-table
      :rows="authorsStore.authors"
      :columns="columns"
      row-key="id"
      @row-click="handleRowClick"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AuthorCardComponent from '../components/AuthorCardComponent.vue';
import { Author } from '../components/models';
import { useBooksStore } from '../stores/booksStore';
import { useAuthorStore } from '../stores/authorsStore';
import { useAuthorBookStore } from '../stores/authors_booksStore';
import { QTableColumn } from 'quasar';
import api from 'axios';

const booksStore = useBooksStore();
const authorsStore = useAuthorStore();
const authorsBooksStore = useAuthorBookStore();

const columns: QTableColumn[] = [
  { name: 'id', label: 'ID', align: 'center', field: 'id', sortable: true },
  { name: 'name', label: 'Name', align: 'center', field: 'name', sortable: true },
  {  name: 'books', label: 'Libro(s)', align: 'center', 
      field: (row: Author) => {
        return booksStore.books
             ?.map(book => {
               const authorBookRelation = authorsBooksStore.author_book.find(
                 (author_book) => author_book.author_id === row.id && author_book.book_id === book.id
               );

               return authorBookRelation ? book.title : undefined;
             })
             .filter((title): title is string => title !== undefined)
             .join(', ') || 'Sin libros';
      }
  }
];

let seeComponent = ref(false);
const isEditing = ref(false);
let currentAuthor = ref<Author>();

function handleRowClick(evt: Event, row: Author) {
  seeComponent.value = true;
  currentAuthor.value = row;
  isEditing.value = true;
}

async function handleSubmit(author: Author) {
  try {
    if (isEditing.value) {
      await api.put(`/authors/${author.id}`, author);
    } else {
      await api.post('/authors', author);
    }
    handleClose();
  } catch (error) {
    console.error(error);
  }
}
async function handleDelete(author: Author){
  try{
    await api.delete(`/authors/${author.id}`);
    handleClose();
  } catch (error) {
    console.error(error);
  }
}
function handleCancel() {
  seeComponent.value = false;
  isEditing.value = false;
  currentAuthor = ref<Author>();
}
async function handleClose(){
  handleCancel();
  await authorsStore.fetchAuthors();
}

</script>
