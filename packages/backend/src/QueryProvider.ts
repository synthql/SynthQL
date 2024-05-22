import { QueryProviderInput, Table } from '@synthql/queries';

export interface QueryProvider<DB, TTable extends Table<DB>> {
    table: TTable;
    execute(query: QueryProviderInput<DB, TTable>): Promise<Array<any>>;
}
