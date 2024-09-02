Crear variable de entorno .env con el siguiente formato:

DB_CONFIG=postgresql://(nombre del usuario de postgresql, por defecto postgres):(contraseña del usuario)@localhost:(puerto de postgreSQL, por defecto 5432)/(nombre de la bdd)

Deberemos crear, en la bdd seleccionada tres tablas:

CREATE TABLE books (    id SERIAL PRIMARY KEY,    title VARCHAR(255) NOT NULL);
CREATE TABLE authors (    id SERIAL PRIMARY KEY,    name VARCHAR(255) NOT NULL);
CREATE TABLE book_author (    book_id INTEGER NOT NULL REFERENCES books(id),    author_id INTEGER NOT NULL REFERENCES authors(id),    PRIMARY KEY (book_id, author_id));