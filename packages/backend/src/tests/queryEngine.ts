import dotenv from 'dotenv';
import { Pool } from 'pg';
import { QueryEngine } from '../QueryEngine';
import { Middleware } from '../execution/middleware';
import { DB } from './generated';
dotenv.config();

export const pool = new Pool({
    connectionString:
        process.env.DATABASE_URL ??
        'postgres://postgres:postgres@localhost:5432/postgres',
});

export function createQueryEngine(middlewares?: Array<Middleware<any, any>>) {
    return new QueryEngine<DB>({
        pool,
        schema: 'public',
        middlewares,
    });
}
