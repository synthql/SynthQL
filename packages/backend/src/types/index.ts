import { Query } from '@synthql/queries';

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

// export type AnyDb = Record<string, Record<string, Record<string, any>>>;
export type AnyQuery = Query<AnyDb, string>;
export type AnyTable = string;
