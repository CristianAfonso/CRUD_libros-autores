<template>
    <q-page>
      <q-table v-if="props.books"
        :rows="props.books"
        :columns="columns"
        row-key="id"
      />
    </q-page>
  </template>
  
  <script setup lang="ts">

import { Book } from '../components/models';
import { QTableColumn } from 'quasar';

interface Props {
  books: Book[];
};
const props = withDefaults(defineProps<Props>(), {
});
const columns: QTableColumn[] = [
  { name: 'id', label: 'ID', align: 'left', field: 'id', sortable: true },
  { name: 'title', label: 'Title', align: 'left', field: 'title', sortable: true },
  ];
  
</script> 