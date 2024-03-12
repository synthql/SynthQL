import { AnyQuery } from 'packages/backend/src/types';
import { Selection } from './types';
import { TableRef } from '../../../../refs/TableRef';
import { ColumnRef } from '../../../../refs/ColumnRef';
import { SqlBuilder } from './exp';

export class SelectionColumn implements Selection {
    public readonly type: 'column' = 'column';

    public constructor(public readonly column: ColumnRef) {}

    static fromQuery(
        rootQuery: AnyQuery,
        defaultSchema: string,
    ): SelectionColumn[] {
        const result: SelectionColumn[] = [];
        for (const [column, value] of Object.entries(rootQuery.select)) {
            if (value === true) {
                const table = TableRef.fromQuery(defaultSchema, rootQuery);
                const columnRef = new ColumnRef(table, column);
                result.push(new SelectionColumn(columnRef));
            }
        }
        return result;
    }

    toSql() {
        return new SqlBuilder().addSelectColumn(this.column);
    }

    extractFromRow(row: any, target: any): void {
        // TODO assert prescence
        const tmp = row[this.column.column];
        if (tmp === undefined) {
            throw new Error(
                `Column ${this.column.column} not found in row: ${JSON.stringify(row)}`,
            );
        }
        target[this.column.column] = tmp;
    }
}
