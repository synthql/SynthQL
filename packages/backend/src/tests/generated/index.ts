import { query } from '@synthql/queries';
import { DB } from './db';
import { schema } from './schema';
export type { DB } from './db';
export { schema } from './schema';
export const from = query<DB>(schema).from;
