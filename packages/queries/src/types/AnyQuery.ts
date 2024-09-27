import { Column } from './Column';
import { Table } from './Table';
import { Query } from './types';

export type AnyTableDef = {
    columns: Record<
        string,
        {
            type: any;
            selectable: boolean;
            includable: boolean;
            whereable: boolean;
            nullable: boolean;
            isPrimaryKey: boolean;
        }
    >;
};
export type AnyDB = Record<string, AnyTableDef>;
export type AnyTable = Table<AnyDB>;
export type AnyColumn = Column<AnyDB, AnyTable>;
export type AnyQuery = Query<AnyDB, AnyTable>;
