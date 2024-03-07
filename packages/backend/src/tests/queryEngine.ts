import dotenv from 'dotenv';
import { QueryEngine } from '../QueryEngine';
import { DB } from './db';
import { Pool } from 'pg';

dotenv.config();

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
})

export const queryEngine = new QueryEngine<DB>({
    pool,
    schema: 'public',
});
