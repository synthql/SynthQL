import { QueryProvider } from '../../../QueryProvider';
import { AnyDb, AnyQuery } from '../../../types';
import { RefContext, createRefContext } from '../../../refs/RefContext';
import { QueryExecutor } from '../../types';
import { ColumnRef } from '../../../refs/ColumnRef';
import { Table } from '@synthql/queries';
import { convertWhereToQueryProviderInput } from './convertWhereToQueryProviderInput';

export class QueryProviderExecutor implements QueryExecutor {
    private providersByTable: Map<string, QueryProvider<AnyDb, string>>;

    constructor(providers: QueryProvider<AnyDb, string>[]) {
        this.providersByTable = new Map(providers.map((p) => [p.table, p]));
    }

    execute(query: AnyQuery): Promise<Array<any>> {
        const provider = this.providersByTable.get(query.from);

        if (!provider) {
            throw new Error(`No provider for table ${query.from}`);
        }

        const queryProviderInput = convertWhereToQueryProviderInput(provider.table, query.where);

        return provider.execute(queryProviderInput);
    }

    canExecute<TQuery extends AnyQuery>(
        query: TQuery,
    ): { query: TQuery; remaining: TQuery[] } | undefined {
        const isSupported = this.providersByTable.has(query.from);

        if (!isSupported) {
            return undefined;
        }

        const queryWithoutChildren: TQuery = {
            ...query,
            include: {},
        };

        const remaining = Object.values(query.include ?? {}) as TQuery[];

        return { query: queryWithoutChildren, remaining };
    }

    collectRefValues(row: any, columns: ColumnRef[]): RefContext {
        const refContext = createRefContext();
        for (const column of columns) {
            const value = row[column.column];
            refContext.addValues(column, value);
        }

        return refContext;
    }
}
