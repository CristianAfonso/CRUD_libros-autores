import db from '../database';
import { and, eq } from 'drizzle-orm';
import { author, book, book_author } from '../schema';
export async function getAllRelationships() {
    try {
        return await db.select().from(book_author);
    } catch (error) {
        console.error('Error al obtener todos los autores relacionados con libros:', error);
        throw new Error('Error al obtener todos los libros');
    }
}
export async function addAuthorToBook(book_id: number, author_id: number): Promise<void> {
    try {
        await db.insert(book_author).values({ book_id, author_id });
    } catch (error) {
        console.error('Error al asociar el autor con el libro:', error);
        throw new Error('Error al asociar el autor con el libro');
    }
}
export async function deleteAuthorFromBook(book_id: number, author_id: number): Promise<void> {
    try {
        const result = await db.delete(book_author)
            .where(and(eq(book_author.book_id, book_id), eq(book_author.author_id, author_id)));
    if (result.count === 0) {
        throw new Error('Relación entre el libro y el autor no encontrada');
    }
    } catch (error) {
        console.error('Error al eliminar la relación:', error);
        throw new Error('Error al eliminar la relación');
    }
}
export async function getAuthorsOfBook(book_id: number) {
    try {
        return await db.select()
            .from(book_author)
            .leftJoin(author, eq(book_author.author_id, author.id))
            .leftJoin(book, eq(book_author.book_id, book.id))
            .where(eq(book.id, book_id));
    } catch (error) {
        console.error('Error al obtener autores del libro:', error);
        throw new Error('Error al obtener autores del libro');
    }
}