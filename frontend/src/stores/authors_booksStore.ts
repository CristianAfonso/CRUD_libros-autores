import { defineStore } from 'pinia';
import api from 'axios';
import { AuthorBook, AuthorBookState } from 'src/components/models';

export const useAuthorBookStore = defineStore('book_author', {
  state: (): AuthorBookState => ({
    author_book: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchAuthorsBooks() {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.get<AuthorBook[]>('/relationships');
        this.author_book = response.data;
      } catch (err) {
        this.error = 'Error al cargar las relaciones';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});