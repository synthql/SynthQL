import { Query, Table } from '@synthql/queries';

type AnyTableDef = {
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

export type AnyDb = Record<string, AnyTableDef>;

export type AnyTable = Table<AnyDb>;
export type AnyQuery = Query<AnyDb, AnyTable>;
