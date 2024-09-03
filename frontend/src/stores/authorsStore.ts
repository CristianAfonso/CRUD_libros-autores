import { defineStore } from 'pinia';
import api from 'axios';
import { Author, AuthorState } from 'src/components/models';

export const useAuthorStore = defineStore('authors', {
  state: (): AuthorState => ({
    authors: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchAuthors() {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.get<Author[]>('http://localhost:3000/authors');
        this.authors = response.data;
      } catch (err) {
        this.error = 'Error al cargar los autores';
      } finally {
        this.loading = false;
      }
    },
  },
});