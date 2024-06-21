import { Pool } from 'pg';
import { QueryEngine, collectLast } from '../../..';
import { Query, Schema, Table, getTableNames } from '@synthql/queries';

type TableName = string;
type TableRows = Array<any>;

export type AllTablesRowsMap = Map<TableName, TableRows>;

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

export async function getTableRowsByTableName<DB>(
    pool: Pool,
    schema: Schema<DB>,
): Promise<AllTablesRowsMap> {
    const allTablesRowsMap: AllTablesRowsMap = new Map();

    const client = await pool.connect();

    for (const tableName of getTableNames<DB>(schema)) {
        const sql = `select * from ${tableName}`;

        const queryResult = await client.query(sql);

        const rows = queryResult.rows;

        allTablesRowsMap.set(tableName, rows);
    }

    return allTablesRowsMap;
}
