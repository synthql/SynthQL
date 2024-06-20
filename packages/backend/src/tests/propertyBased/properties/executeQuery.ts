import { Pool } from 'pg';
import { QueryEngine, collectLast } from '../../..';
import { Schema, getTableNames } from '@synthql/queries';
import { AllDatabaseTableRowsMap } from '../arbitraries/arbitraries';

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

export async function getValuesByTableName<DB>(
    pool: Pool,
    schema: Schema<DB>,
): Promise<AllDatabaseTableRowsMap> {
    const allValuesMap: AllDatabaseTableRowsMap = new Map();

    const client = await pool.connect();

    for (const tableName of getTableNames<DB>(schema)) {
        const sql = `select * from ${tableName}`;

        const queryResult = await client.query(sql);

        const rows = queryResult.rows;

        allValuesMap.set(tableName, rows);
    }

    return allValuesMap;
}
