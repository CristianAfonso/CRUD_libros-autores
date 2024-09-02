<template>
    <q-page>
      <q-table
        :rows="authorStore.authors"
        :columns="columns"
        row-key="id"
      />
    </q-page>
  </template>
  
  <script setup lang="ts">
import { QTableColumn } from 'quasar';
import { useAuthorStore } from 'src/stores/authorsStore';

const authorStore = useAuthorStore();
const columns: QTableColumn[] = [
  { name: 'id', label: 'ID', align: 'left', field: 'id', sortable: true },
  { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true },
  ];
  

</script>