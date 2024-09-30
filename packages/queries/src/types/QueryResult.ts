import { Static } from '@sinclair/typebox';
import { Query } from './types';

export type QueryResult<TQuery extends Query> =
    TQuery extends Query<infer TQueryResult>
        ? Simplify<Static<TQueryResult>>
        : unknown;

type Simplify<T> =
    T extends Array<infer U>
        ? Simplify<U>[]
        : T extends Date
          ? T
          : T extends object
            ? { [K in keyof T]: Simplify<T[K]> }
            : T;
