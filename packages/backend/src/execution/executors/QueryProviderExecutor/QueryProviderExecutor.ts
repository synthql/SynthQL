import { AnyDB, AnyQuery } from '@synthql/queries';
import { QueryProvider } from '../../../QueryProvider';
import { QueryExecutor } from '../../types';
import { convertWhereToQueryProviderInput } from './convertWhereToQueryProviderInput';

export class QueryProviderExecutor implements QueryExecutor {
    private providersByTable: Map<string, QueryProvider<AnyDB, string>>;

    constructor(providers: QueryProvider<AnyDB, string>[]) {
        this.providersByTable = new Map(providers.map((p) => [p.table, p]));
    }

    execute(query: AnyQuery): Promise<Array<any>> {
        const provider = this.providersByTable.get(query.from);

        if (!provider) {
            throw new Error(`No provider for table ${query.from}`);
        }

        const queryProviderInput = convertWhereToQueryProviderInput(
            provider.table,
            query.where,
        );

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
}
