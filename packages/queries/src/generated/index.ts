import { query } from '../query';
import { DB } from './db';
import { schema } from './schema';
export type { DB } from './db';
export { schema } from './schema';
export const from = query<DB>(schema).from;
