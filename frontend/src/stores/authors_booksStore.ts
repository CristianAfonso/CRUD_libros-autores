import { defineStore } from 'pinia';
import api from 'axios';
import { AuthorBook, AuthorBookState } from 'src/components/models';

export const useAuthorStore = defineStore('authors', {
  state: (): AuthorBookState => ({
    author_book: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchAuthors() {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.get<AuthorBook[]>('http://localhost:3000/relationships');
        this.author_book = response.data;
      } catch (err) {
        this.error = 'Error al cargar los autores';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});