<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ isEditMode ? 'Editar Libro' : 'Crear Libro' }}</div>
    </q-card-section>

    <q-card-section>
      <q-form @submit.prevent="submitForm">
        <q-input
          v-model="form.title"
          label="Title"
          filled
          :rules="[val => !!val || 'Se necesita un título']"
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
import { Book } from './models';

const props = defineProps<{
  book?: Book;
}>();

const emit = defineEmits<{
  (e: 'submit', book: Book): void;
  (e: 'cancel'): void;
  (e: 'delete', book: Book): void;
}>();

const isEditMode = !!props.book;

const form = ref<Book>({
  id: props.book?.id || 0,
  title: props.book?.title || ''
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
