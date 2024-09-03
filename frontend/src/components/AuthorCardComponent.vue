<template>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ isEditMode ? 'Editar Autor' : 'Nuevo Autor' }}</div>
      </q-card-section>
  
      <q-card-section>
        <q-form @submit.prevent="submitForm">
          <q-input
            v-model="form.name"
            label="Title"
            filled
            :rules="[val => !!val || 'Se necesita un nombre']"
          />
          <q-btn
            type="submit"
            label="Guardar"
            color="primary"
          />
          <q-btn
            @click="cancel"
            label="Cancelar"
            color="secondary"
            flat
          />
          <q-btn
            v-if="isEditMode"
            @click="remove"
            label="Eliminar"
            color="red"
            flat
          />
        </q-form>
      </q-card-section>
    </q-card>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, defineEmits } from 'vue';
  import { Author } from './models';
  
  const props = defineProps<{
    author?: Author;
  }>();
  
  const emit = defineEmits<{
    (e: 'submit', book: Author): void;
    (e: 'cancel'): void;
    (e: 'delete', book: Author): void;
  }>();
  
  const isEditMode = !!props.author;
  
  const form = ref<Author>({
    id: props.author?.id || 0,
    name: props.author?.name || ''
  });
  
  function submitForm() {
    emit('submit', form.value);
  }
  
  function cancel() {
    emit('cancel');
  }
  
  function remove() {
    emit('delete', form.value);
  }
  </script>
  