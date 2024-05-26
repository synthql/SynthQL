import { Table } from '@synthql/queries';
import { QueryProviderInput } from './types/QueryProviderInput';

export interface QueryProvider<DB, TTable extends Table<DB>> {
    table: TTable;
    execute(query: QueryProviderInput<DB, TTable>): Promise<Array<any>>;
}
