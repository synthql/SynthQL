import { QueryEngine, collectLast } from '../..';
import { Query, Table } from '@synthql/queries';

export async function executeAndWait<DB>(
    queryEngine: QueryEngine<DB>,
    query: Query<DB, Table<DB>>,
): Promise<any> {
    const queryResult = await collectLast(
        queryEngine.execute(query, {
            returnLastOnly: true,
        }),
    );

    return queryResult;
}
