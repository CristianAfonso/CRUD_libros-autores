import { eq } from 'drizzle-orm';
import db from '../database';
import { book, book_author, author } from '../schema';

export async function createBook(title: string): Promise<void> {
    try {
        await db.insert(book).values({ title });
    } catch (error) {
        console.error('Error al crear el libro:', error);
        throw new Error('Error al crear el libro');
    }
}

export async function getBookById(bookId: number) {
    try {
        const result = await db.select().from(book).where(eq(book.id, bookId));
        if (result.length === 0) {
            throw new Error('Libro no encontrado');
        }
        return result;
    } catch (error) {
        console.error('Error al obtener el libro:', error);
        throw new Error('Error al obtener el libro');
    }
}

export async function getAllBooks() {
    try {
        return await db.select().from(book);
    } catch (error) {
        console.error('Error al obtener todos los libros:', error);
        throw new Error('Error al obtener todos los libros');
    }
}

export async function updateBook(bookId: number, newTitle: string): Promise<void> {
    try {
        const result = await db.update(book).set({ title: newTitle }).where(eq(book.id, bookId));
        if (result.count === 0) {
            throw new Error('Libro no encontrado para actualizar');
        }
    } catch (error) {
        console.error('Error al actualizar el libro:', error);
        throw new Error('Error al actualizar el libro');
    }
}

export async function deleteBook(bookId: number): Promise<void> {
    try {
        const result = await db.delete(book).where(eq(book.id, bookId));
        if (result.count === 0) {
            throw new Error('Libro no encontrado para eliminar');
        }
    } catch (error) {
        console.error('Error al eliminar el libro:', error);
        throw new Error('Error al eliminar el libro');
    }
}

export async function addAuthorToBook(bookId: number, authorId: number): Promise<void> {
    try {
        await db.insert(book_author).values({ bookId, authorId });
    } catch (error) {
        console.error('Error al asociar el autor con el libro:', error);
        throw new Error('Error al asociar el autor con el libro');
    }
}
export async function deleteAuthorFromBook(bookId: number, authorId: number): Promise<void> {
    try {
        const result = await db.delete(book_author)
            .where(eq(book_author.bookId, bookId) && eq(book_author.authorId, authorId))
    if (result.count === 0) {
        throw new Error('Relación entre el libro y el autor no encontrada');
    }
    } catch (error) {
        console.error('Error al asociar el autor con el libro:', error);
        throw new Error('Error al asociar el autor con el libro');
    }
}
export async function getAuthorsOfBook(bookId: number) {
    try {
        return await db.select()
            .from(book_author)
            .leftJoin(author, eq(book_author.authorId, author.id))
            .leftJoin(book, eq(book_author.bookId, book.id))
            .where(eq(book.id, bookId));
    } catch (error) {
        console.error('Error al obtener autores del libro:', error);
        throw new Error('Error al obtener autores del libro');
    }
}
