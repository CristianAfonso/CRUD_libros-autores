<template>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{( isAddingAuthor ? 'Añadir' : 'Eliminar') + ' autor de ' + props.book?.title }}</div>
      </q-card-section>
  
      <q-card-section>
        <q-form @submit.prevent="add">
            <q-select
                style="width: auto;"
                filled
                v-model="authorName"
                :options="options"
                label="Autor"
            >
              <template v-slot:option="scope">
                  <q-item :key="scope.opt.id"
                    clickable
                    v-close-popup
                    @click="authorName = scope.opt.name; handleAssignAuthor(scope.opt)"
                    dense
                  >
                    <q-item-section>
                      <q-item-label>{{ scope.opt.name }}</q-item-label>
                    </q-item-section>
                  </q-item>
              </template>
            </q-select>
          <q-btn
            v-if="isAddingAuthor"
            type="submit"
            label="Guardar"
            color="primary"
          />
          <q-btn
            v-if="!isAddingAuthor"
            @click="remove"
            label="Eliminar"
            color="red"
          />
          <q-btn
            @click="cancel"
            label="Cancelar"
            color="secondary"
            flat
          />
        </q-form>
      </q-card-section>
    </q-card>
  </template>
  
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { Book, Author, AuthorBook } from './models';
import { useAuthorStore } from '../stores/authorsStore';
import { useAuthorBookStore } from '../stores/authors_booksStore';


const props = defineProps<{
    book?: Book;
    isAdding: boolean;
  }>();

  
const authorsStore = useAuthorStore();
const authorsBooksStore = useAuthorBookStore();

const authorName = ref<string>();

const form = ref<AuthorBook>({
    book_id: props.book?.id || 0,
    author_id: 0
  });

const options =  authorsStore.authors.filter(author => {
    const hasRelation = authorsBooksStore.author_book.some(
      (relation) => relation.author_id === author.id && relation.book_id === props.book?.id
    );
    if (props.isAdding) {
      return !hasRelation;
    } else {
      return hasRelation;
    }
  });

  const emit = defineEmits<{
    (e: 'submit', author_book: AuthorBook): void;
    (e: 'cancel'): void;
    (e: 'delete', author_book: AuthorBook): void;
  }>();
  

  const isAddingAuthor = props.isAdding;


  function handleAssignAuthor(selectedAuthor: Author){
    form.value.author_id = selectedAuthor.id;
  }


  function add() {
    console.log(form)
    emit('submit', form.value);
  }
  
  function cancel() {
    emit('cancel');
  }
  
  function remove() {
    emit('delete', form.value);
  }
  </script>
  