<template>
  <q-page>
        <q-btn
          v-if="!seeComponent"
          @click="seeComponent = true"
          label="Nuevo Autor"
          color="primary"
          flat
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
      :rows="authorStore.authors"
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
import { useAuthorStore } from '../stores/authorsStore';
import { QTableColumn } from 'quasar';
import api from 'axios';

const authorStore = useAuthorStore();

const columns: QTableColumn[] = [
  { name: 'id', label: 'ID', align: 'left', field: 'id', sortable: true },
  { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true },
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
  await authorStore.fetchAuthors();
}

</script>
