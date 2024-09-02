import db from '../database';
import { book_author } from '../schema';
export async function getAllRelationships() {
    try {
        return await db.select().from(book_author);
    } catch (error) {
        console.error('Error al obtener todos los autores relacionados con libros:', error);
        throw new Error('Error al obtener todos los libros');
    }
}