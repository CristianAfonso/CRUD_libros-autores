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
    book_id: integer("book_id").notNull().references(() => book.id),
    author_id: integer("author_id").notNull().references(() => author.id),
});