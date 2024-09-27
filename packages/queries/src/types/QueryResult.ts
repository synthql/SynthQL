import { Static } from '@sinclair/typebox';
import { Query } from './types';

export type QueryResult<DB, TQuery> =
    TQuery extends Query<DB, any, infer TQueryResult>
        ? Simplify<Static<TQueryResult>>
        : unknown;

type Simplify<T> = T extends object ? { [K in keyof T]: Simplify<T[K]> } : T;
