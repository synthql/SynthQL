import { Query, QueryResult, Table } from '@synthql/queries';
import { AnyQuery } from './types';

export interface QueryProvider {
    table: string;
    execute(query: AnyQuery): Promise<Array<any>>;
}
