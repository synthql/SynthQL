import { query } from '../query';
import { DB } from './db';
export { DB } from './db';
export { schema } from './schema';
import { schema } from './schema';
export const from = query<DB>(schema).from;
