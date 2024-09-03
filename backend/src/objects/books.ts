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

export async function getBookById(book_id: number) {
    try {
        const result = await db.select().from(book).where(eq(book.id, book_id));
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

export async function updateBook(book_id: number, newTitle: string): Promise<void> {
    try {
        const result = await db.update(book).set({ title: newTitle }).where(eq(book.id, book_id));
        if (result.count === 0) {
            throw new Error('Libro no encontrado para actualizar');
        }
    } catch (error) {
        console.error('Error al actualizar el libro:', error);
        throw new Error('Error al actualizar el libro');
    }
}

export async function deleteBook(book_id: number): Promise<void> {
    try {
        const result = await db.delete(book).where(eq(book.id, book_id));
        if (result.count === 0) {
            throw new Error('Libro no encontrado para eliminar');
        }
    } catch (error) {
        console.error('Error al eliminar el libro:', error);
        throw new Error('Error al eliminar el libro');
    }
}

