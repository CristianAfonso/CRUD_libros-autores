<template>
    <q-page>
      <q-table v-if="props.authors"
        :rows="props.authors"
        :columns="columns"
        row-key="id"
      />
    </q-page>
  </template>
  
  <script setup lang="ts">
import { QTableColumn } from 'quasar';
import {Author} from '../components/models'
interface Props {
  authors: Author[];
}; 
const props = withDefaults(defineProps<Props>(), {
});
const columns: QTableColumn[] = [
  { name: 'id', label: 'ID', align: 'left', field: 'id', sortable: true },
  { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true },
  ];
  

</script>