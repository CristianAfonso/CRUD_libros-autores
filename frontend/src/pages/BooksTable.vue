<template>
  <q-page>
    <q-btn
      v-if="!editBook"
      @click=" handleCancel(); editBook = true;"
      label="Nuevo Libro"
      color="primary"
      style="margin: 25px;"
    />
    <BooksAuthorsCardComponent 
      v-if="changeAuthor && currentBook"
      :book="currentBook"
      :isAdding="isAdding"
      @submit="handleSubmitNewAuthor"
      @cancel="handleCancel"
      @delete="handleDeleteAuthor"
    />
    <BookCardComponent
      v-if="editBook"
      :book="currentBook"
      @submit="handleSubmit"
      @cancel="handleCancel"
      @delete="handleDelete"
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
          <q-btn color="green" icon="add" @click.stop="handleAddAuthor(props.row)"></q-btn>
          <q-btn color="red" icon="remove" @click.stop="handleRemoveAuthor(props.row)" style="margin-left: 10px;"></q-btn>
        </q-td>
      </template>
    </q-table>
    <ErrorDialogComponent v-if="showErrorDialog"
      :errorMessage="errorMessage"
      :showErrorDialog="showErrorDialog"
      @close="handleCloseError"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BookCardComponent from '../components/BookCardComponent.vue';
import BooksAuthorsCardComponent from '../components/BooksAuthorsCardComponent.vue'
import { AuthorBook, Book } from '../components/models';
import { useBooksStore } from '../stores/booksStore';
import { useAuthorStore } from '../stores/authorsStore';
import { useAuthorBookStore } from '../stores/authors_booksStore';
import { QTableColumn } from 'quasar';
import ErrorDialogComponent from '../components/ErrorDialogComponent.vue';
import api from 'axios';
import axios from 'axios';

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

let editBook = ref(false);
let changeAuthor = ref(false);

const showErrorDialog = ref(false);
const isEditing = ref(false);
const isAdding = ref(false);

let errorMessage = ref<string>('');
let currentBook = ref<Book>();

function handleRowClick(evt: Event, row: Book) {
  handleCancel();
  editBook.value = true;
  currentBook.value = row;
  isEditing.value = true;
}

function handleAddAuthor(book: Book){
  handleCancel();
  currentBook.value = book;
  isAdding.value = true;
  changeAuthor.value = true;
}

function handleRemoveAuthor(book: Book){ 
  handleCancel();
  currentBook.value = book;
  isAdding.value = false;
  changeAuthor.value = true;
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
    showErrorDialog.value = true;
    if (axios.isAxiosError(error)){
      errorMessage.value = error.response?.data?.error || 'Error desconocido';
    }else{
      errorMessage.value = 'Error inesperado';
    }
  }
}
async function handleSubmitNewAuthor(author_book: AuthorBook) {
  
  try{
    console.log(`/book/${author_book.book_id}/author/${author_book.author_id}/`)
    await api.post(`/book/${author_book.book_id}/author/${author_book.author_id}/`);
    handleClose();
  } catch (error) {
    console.error(error);
  }
}
async function handleDeleteAuthor(author_book: AuthorBook) {
  try{
    await api.delete(`/book/${author_book.book_id}/author/${author_book.author_id}/`);
    handleClose();
  } catch (error) {
    showErrorDialog.value = true;
    if (axios.isAxiosError(error)){
      errorMessage.value = error.response?.data?.error || 'Error desconocido';
    }else{
      errorMessage.value = 'Error inesperado';
    }
  }
}
function handleCloseError(){
  errorMessage = ref<string>('');
  showErrorDialog.value = false;
}
function handleCancel() {
  editBook.value = false;
  isEditing.value = false;
  isAdding.value = false;
  changeAuthor.value = false;
  currentBook = ref<Book>();
}
async function handleClose(){
  handleCancel();
  await booksStore.fetchBooks();
  await authorsBooksStore.fetchAuthorsBooks();
}
</script>
