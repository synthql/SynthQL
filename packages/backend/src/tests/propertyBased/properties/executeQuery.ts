import { QueryEngine, collectLast } from '../../..';

export async function executeQuery<DB>(
    queryEngine: QueryEngine<DB>,
    query: any,
): Promise<any> {
    const queryResult = await collectLast(
        queryEngine.execute(query, {
            returnLastOnly: true,
        }),
    );

    return queryResult;
}
