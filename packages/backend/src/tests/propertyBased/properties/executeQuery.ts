import { Pool } from 'pg';
import { QueryEngine, collectLast } from '../../..';
import { AnySchema, getTableNamesFromGenericDbSchema } from '@synthql/queries';

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

export async function getTableValues(pool: Pool, schema: AnySchema) {
    const allValuesMap = new Map<string, Array<any>>();

    const client = await pool.connect();

    for (const tableName of getTableNamesFromGenericDbSchema(schema)) {
        const sql = `select * from ${tableName}`;

        const queryResult = await client.query(sql);

        const rows = queryResult.rows;

        allValuesMap.set(tableName, rows);
    }

    return allValuesMap;
}
