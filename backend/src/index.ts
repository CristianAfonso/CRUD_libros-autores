import { Elysia, t } from 'elysia';
import { 
    createBook, getBookById, getAllBooks, updateBook, deleteBook, addAuthorToBook , getAuthorsOfBook,
    deleteAuthorFromBook
} from './objects/books';
import { 
    createAuthor, getAuthorById, getAllAuthors, updateAuthor, deleteAuthor 
} from './objects/authors';

const app = new Elysia();

app.get('/', () => ({
  message: 'Bienvenido a la API de CRUD libros y autores',
}));

// Libros
app.get('/books', async () => {
  try {
    return await getAllBooks();
  } catch (error) {
    console.error('Error al obtener todos los libros:', error);
    return { error: 'Error al obtener todos los libros' };
  }
});

app.get('/books/:id', async ({ params: { id } }) => {
  try {
    return await getBookById(Number(id));
  } catch (error) {
    console.error('Error al obtener el libro:', error);
    return { error: 'Error al obtener el libro' };
  }
});

app.post('/books', 
  async ({ body }) => {
    try {
      await createBook(body.title);
      return { message: 'Libro creado con éxito' };
    } catch (error) {
      console.error('Error al crear el libro:', error);
      return { error: 'Error al crear el libro' };
    }
  },
  {
    body: t.Object({
      title: t.String(),
    }),
  }
);

app.put('/books/:id', 
  async ({ params: { id }, body }) => {
    try {
      await updateBook(Number(id), body.title);
      return { message: 'Libro actualizado con éxito' };
    } catch (error) {
      console.error('Error al actualizar el libro:', error);
      return { error: 'Error al actualizar el libro' };
    }
  },
  {
    body: t.Object({
      title: t.String(),
    }),
  }
);

app.delete('/books/:id', async ({ params: { id } }) => {
  try {
    await deleteBook(Number(id));
    return { message: 'Libro eliminado con éxito' };
  } catch (error) {
    console.error('Error al eliminar el libro:', error);
    return { error: 'Error al eliminar el libro' };
  }
});

app.get('/books/:id/authors', async ({ params: { id } }) => {
  const authors = await getAuthorsOfBook(Number(id));
  return authors;
});




app.get('/authors', async () => {
  try {
    return await getAllAuthors();
  } catch (error) {
    console.error('Error al obtener todos los autores:', error);
    return { error: 'Error al obtener todos los autores' };
  }
});

app.get('/authors/:id', async ({ params: { id } }) => {
  try {
    return await getAuthorById(Number(id));
  } catch (error) {
    console.error('Error al obtener el autor:', error);
    return { error: 'Error al obtener el autor' };
  }
});

app.post('/authors', 
  async ({ body }) => {
    try {
      await createAuthor(body.name);
      return { message: 'Autor creado con éxito' };
    } catch (error) {
      console.error('Error al crear el autor:', error);
      return { error: 'Error al crear el autor' };
    }
  },
  {
    body: t.Object({
      name: t.String(),
    }),
  }
);

app.put('/authors/:id', 
  async ({ params: { id }, body }) => {
    try {
      await updateAuthor(Number(id), body.name);
      return { message: 'Autor actualizado con éxito' };
    } catch (error) {
      console.error('Error al actualizar el autor:', error);
      return { error: 'Error al actualizar el autor' };
    }
  },
  {
    body: t.Object({
      name: t.String(),
    }),
  }
);

app.delete('/authors/:id', async ({ params: { id } }) => {
  try {
    await deleteAuthor(Number(id));
    return { message: 'Autor eliminado con éxito' };
  } catch (error) {
    console.error('Error al eliminar el autor:', error);
    return { error: 'Error al eliminar el autor' };
  }
});

app.post('/book/:bookId/author/:authorId', 
  async ({ params: { bookId, authorId } }) => {
    try {
      await addAuthorToBook(Number(bookId), Number(authorId));
      return { message: 'Autor asociado al libro con éxito' };
    } catch (error) {
      console.error('Error al asociar el autor con el libro:', error);
      return { error: 'Error al asociar el autor con el libro' };
    }
  }
);
app.delete('/book/:bookId/author/:authorId', 
  async ({ params: { bookId, authorId } }) => {
  try {
      await deleteAuthorFromBook(Number(bookId), Number(authorId));
      return { message: 'Asociación entre autor y libro eliminada con éxito' };
    } catch (error) {
      console.error('Error al eliminar la asociación entre el autor y el libro:', error);
      return { error: 'Error al eliminar la asociación entre el autor y el libro' };
    }
  }
);
app.listen(3000, () => {
  console.log(`🦊 Elysia is running at http://localhost:3000`);
});
