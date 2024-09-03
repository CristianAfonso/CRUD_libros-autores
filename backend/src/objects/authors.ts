import { eq } from 'drizzle-orm';
import db from '../database';
import { author } from '../schema';

export async function createAuthor(name: string): Promise<void> {
    try {
        await db.insert(author).values({ name });
    } catch (error) {
        console.error('Error al crear el autor:', error);
        throw new Error(`Error al crear el autor: ${error}`);
    }
}

export async function getAuthorById(author_id: number) {
    try {
        const result = await db.select().from(author).where(eq(author.id, author_id));
        if (!result) {
            throw new Error('Autor no encontrado');
        }
        return result[0];
    } catch (error) {
        console.error('Error al obtener el autor:', error);
        throw new Error(`Error al obtener el autor: ${error}`);
    }
}

export async function getAllAuthors() {
    try {
        return await db.select().from(author);
    } catch (error) {
        console.error('Error al obtener todos los autors:', error);
        throw new Error(`Error al obtener todos los autors: ${error}`);
    }
}

export async function updateAuthor(author_id: number, newTitle: string): Promise<void> {
    try {
        const result = await db.update(author).set({ name: newTitle }).where(eq(author.id, author_id));
        if (result.count === 0) {
            throw new Error('Autor no encontrado para actualizar');
        }
    } catch (error) {
        console.error('Error al actualizar el autor:', error);
        throw new Error(`Error al actualizar el autor: ${error}`);
    }
}

export async function deleteAuthor(author_id: number): Promise<void> {
    try {
        const result = await db.delete(author).where(eq(author.id, author_id));
        if (result.count === 0) {
            throw new Error('Autor no encontrado para eliminar');
        }
    } catch (error) {
        console.error('Error al eliminar el autor:', error);
        throw new Error(`Error al eliminar el autor: ${error}`);
    }
}
