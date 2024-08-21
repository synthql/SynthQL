import { Pool } from 'pg';
import { QueryEngine } from '@synthql/backend';
import { DB } from './generated';

export const pool = new Pool({
    connectionString: 'postgres://postgres:postgres@localhost:5432/postgres',
});

export const queryEngine = new QueryEngine<DB>({
    pool,
    schema: 'public',
});
