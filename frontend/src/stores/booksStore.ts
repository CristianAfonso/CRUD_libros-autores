import { defineStore } from 'pinia';
import api from 'axios';
import { Book, BooksState } from 'src/components/models';

export const useBooksStore = defineStore('books', {
  state: (): BooksState => ({
    books: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchBooks() {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.get<Book[]>('/books');
        this.books = response.data;
      } catch (err) {
        this.error = 'Error al cargar los libros';
      } finally {
        this.loading = false;
      }
    },
  },
});