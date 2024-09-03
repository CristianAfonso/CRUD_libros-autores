import { Elysia, t } from 'elysia';
import { 
    createBook, getBookById, getAllBooks, updateBook, deleteBook
} from './objects/books';
import { 
    createAuthor, getAuthorById, getAllAuthors, updateAuthor, deleteAuthor 
} from './objects/authors';
import { getAllRelationships, addAuthorToBook , getAuthorsOfBook,  deleteAuthorFromBook } from './objects/author_books';
import cors from '@elysiajs/cors';

const app = new Elysia();

app.use(cors());

app.get('/', () => ({
  message: 'Bienvenido a la API de CRUD libros y autores',
}));

app.get('/books', async () => {
  try {
    return await getAllBooks();
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `ESTE MENSAJE DE ERROR ES SOLO PARA UN ENTORNO DE PRUEBAS -> ${error}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
});

app.get('/books/:id', async ({ params: { id } }) => {
  try {
    return await getBookById(Number(id));
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `ESTE MENSAJE DE ERROR ES SOLO PARA UN ENTORNO DE PRUEBAS -> ${error}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
});

app.post('/books', 
  async ({ body }) => {
    try {
      await createBook(body.title);
      return { message: 'Libro creado con éxito' };
    } catch (error) {
      return new Response(
        JSON.stringify({ error: `ESTE MENSAJE DE ERROR ES SOLO PARA UN ENTORNO DE PRUEBAS -> ${error}` }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
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
      return new Response(
        JSON.stringify({ error: `ESTE MENSAJE DE ERROR ES SOLO PARA UN ENTORNO DE PRUEBAS -> ${error}` }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
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
    return new Response(
      JSON.stringify({ error: `ESTE MENSAJE DE ERROR ES SOLO PARA UN ENTORNO DE PRUEBAS -> ${error}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
});

app.get('/books/:id/authors', async ({ params: { id } }) => {
  try{
    return await getAuthorsOfBook(Number(id));
  }catch (error){
    return new Response(
      JSON.stringify({ error: `ESTE MENSAJE DE ERROR ES SOLO PARA UN ENTORNO DE PRUEBAS -> ${error}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
});




app.get('/authors', async () => {
  try {
    return await getAllAuthors();
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `ESTE MENSAJE DE ERROR ES SOLO PARA UN ENTORNO DE PRUEBAS -> ${error}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
});

app.get('/authors/:id', async ({ params: { id } }) => {
  try {
    return await getAuthorById(Number(id));
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `ESTE MENSAJE DE ERROR ES SOLO PARA UN ENTORNO DE PRUEBAS -> ${error}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
});

app.post('/authors', 
  async ({ body }) => {
    try {
      await createAuthor(body.name);
      return { message: 'Autor creado con éxito' };
    } catch (error) {
      return new Response(
        JSON.stringify({ error: `ESTE MENSAJE DE ERROR ES SOLO PARA UN ENTORNO DE PRUEBAS -> ${error}` }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
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
      return new Response(
        JSON.stringify({ error: `ESTE MENSAJE DE ERROR ES SOLO PARA UN ENTORNO DE PRUEBAS -> ${error}` }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
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
    return new Response(
      JSON.stringify({ error: `ESTE MENSAJE DE ERROR ES SOLO PARA UN ENTORNO DE PRUEBAS -> ${error}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
});

app.post('/book/:book_id/author/:author_id', 
  async ({ params: { book_id, author_id } }) => {
    try {
      await addAuthorToBook(Number(book_id), Number(author_id));
      return { message: 'Autor asociado al libro con éxito' };
    } catch (error) {
      return new Response(
        JSON.stringify({ error: `ESTE MENSAJE DE ERROR ES SOLO PARA UN ENTORNO DE PRUEBAS -> ${error}` }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }
  }
);
app.delete('/book/:book_id/author/:author_id', 
  async ({ params: { book_id, author_id } }) => {
  try {
      await deleteAuthorFromBook(Number(book_id), Number(author_id));
      return { message: 'Asociación entre autor y libro eliminada con éxito' };
    } catch (error) {
      return new Response(
        JSON.stringify({ error: `ESTE MENSAJE DE ERROR ES SOLO PARA UN ENTORNO DE PRUEBAS -> ${error}` }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }
  }
);

app.get('/relationships', async () => {
  try {
    return await getAllRelationships();
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `ESTE MENSAJE DE ERROR ES SOLO PARA UN ENTORNO DE PRUEBAS -> ${error}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
});

app.listen(3000, () => {
  console.log(`🦊 Elysia is running at http://localhost:3000`);
});
