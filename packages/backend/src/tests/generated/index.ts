import { query } from '@synthql/queries';
import { DB } from './db';
export { DB } from './db';
export { schema } from './schema';
export const from = query<DB>().from;
