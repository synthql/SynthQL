import { Table } from './types/Table';
import { Column } from './types/Column';
import { QueryParam } from './types/QueryParam';
import { ColumnValue } from './types/ColumnValue';
import { ColumnReference } from './types/ColumnReference';
import { DB } from './generated';

export function param(id: string, value: unknown): QueryParam {
    return {
        type: 'synthql::param',
        id,
        value,
    };
}

export function paramA<DB, TTable extends Table<DB>>(
    id: Column<DB, TTable>,
    value: ColumnValue<DB, TTable, Column<DB, TTable>>,
): QueryParam {
    return {
        type: 'synthql::param',
        id,
        value,
    };
}

const a = paramA<DB, 'actor'>('first_name', 'John');

export function paramB<DB, T = unknown>(
    id: ColumnReference<DB>,
    value: T,
): QueryParam {
    return {
        type: 'synthql::param',
        id,
        value,
    };
}

const b = paramB<DB>('actor.first_name', 'John');
