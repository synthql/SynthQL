import { Schema } from '@synthql/queries';
import { Pool } from 'pg';
import { getTableNames } from './getTableNames';

type TableName = string;

type TableRows = Array<any>;

export type AllTablesRowsMap = Map<TableName, TableRows>;

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
