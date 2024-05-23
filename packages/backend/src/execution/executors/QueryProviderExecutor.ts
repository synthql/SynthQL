import { QueryProvider } from '../../QueryProvider';
import { AnyQuery } from '../../types';
import { RefContext, createRefContext } from '../../refs/RefContext';
import { QueryExecutor } from '../types';
import { ColumnRef } from '../../refs/ColumnRef';
import { Table, Where } from '@synthql/queries';

export class QueryProviderExecutor<DB> implements QueryExecutor {
    private providersByTable: Map<string, QueryProvider<DB, Table<DB>>>;

    constructor(providers: QueryProvider<DB, Table<DB>>[]) {
        this.providersByTable = new Map(providers.map((p) => [p.table, p]));
    }

    extract(where: Where<DB, Table<DB>>) {
        const w: Record<string, any> = {};

        type N = string | number;

        interface O {
            in: Array<string | number>;
        }

        interface P {
            '= any': string | number;
        }

        function isN(value: unknown): value is N {
            return typeof (value as N) !== 'object';
        }

        function isO(value: unknown): value is O {
            return Array.isArray((value as O).in);
        }

        function isP(value: unknown): value is P {
            return typeof (value as P)['= any'] !== 'object';
        }

        for (const [key, value] of Object.entries(where)) {
            if (isN(value)) {
                w[key] = [value];
            } else if (isO(value)) {
                w[key] = [...value.in];
            } else if (isP(value)) {
                w[key] = [value['= any']];
            } else {
                throw Error('Invalid where clause!');
            }
        }

        return w;
    }

    execute(query: AnyQuery): Promise<Array<any>> {
        const provider = this.providersByTable.get(query.from);

        if (!provider) {
            throw new Error(`No provider for table ${query.from}`);
        }

        const where = this.extract(query.where);

        return provider.execute(where);
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
