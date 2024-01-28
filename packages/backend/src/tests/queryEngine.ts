import dotenv from 'dotenv';
import { QueryEngine } from '../QueryEngine/QueryEngine';
import { DB } from './db';

dotenv.config();

export const queryEngine = new QueryEngine<DB>({
    url: process.env.DATABASE_URL!,
    schema: 'public',
});
