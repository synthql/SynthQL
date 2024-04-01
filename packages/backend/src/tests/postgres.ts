import { config } from 'dotenv';
import pg from 'postgres';

config();

export const sql = pg(
    process.env.DATABASE_URL ??
        'postgres://postgres:postgres@localhost:5432/postgres',
);
