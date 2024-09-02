import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const database = process.env.DB_CONFIG as string;

const client = postgres(database);
const db = drizzle(client);

export default db;