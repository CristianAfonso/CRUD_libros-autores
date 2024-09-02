import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const author = pgTable("authors", {
    id: serial("id").primaryKey(),
    name: text("name"),
});

export const book = pgTable("books", {
    id: serial("id").primaryKey(),
    title: text("title"),
});

export const book_author = pgTable("book_author", {
    bookId: integer("book_id").notNull().references(() => book.id),
    authorId: integer("author_id").notNull().references(() => author.id),
});