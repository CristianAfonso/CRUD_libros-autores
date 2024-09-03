<template>
  <q-page>
    <q-btn
      v-if="!seeComponent"
      @click="seeComponent = true"
      label="Nuevo Libro"
      color="primary"
      style="margin: 25px;"
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
    <q-table
      v-if="booksStore.books"
      :rows="booksStore.books"
      :columns="columns"
      row-key="id"
      @row-click="handleRowClick"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn color="green" icon="add" @click.stop="console.log('Añadir nuevo autor a ' + props.row.title)"></q-btn>
          <q-btn color="red" icon="remove" @click.stop="console.log('Eliminar un autor de ' + props.row.title)" style="margin-left: 10px;"></q-btn>
        </q-td>
      </template>
    </q-table>
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
  { name: 'id', label: 'ID', align: 'center', field: 'id', sortable: true },
  { name: 'title', label: 'Título', align: 'center', field: 'title', sortable: true },
  {  name: 'authors', label: 'Autor(es)', align: 'center', 
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
  }, 
  { name: 'actions', align: 'center',  label: 'Acciones con autores',  field: ''},
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
