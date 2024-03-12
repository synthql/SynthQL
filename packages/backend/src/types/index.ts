import { Query } from '@synthql/queries';

export type AnyDb = Record<string, Record<string, any>>;
export type AnyQuery = Query<AnyDb, string>;
export type AnyTable = string;
