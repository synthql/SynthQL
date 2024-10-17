import { Table } from './Table';
import { Query } from './types';

export type AnyContext = {
    /**
     * A list of permissions that you can pass as
     * part of a context object with which SynthQL
     * will use to transform the query using any
     * middlewares registered on the QueryEngine
     * that it matches
     */
    permissions?: string[];
};

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
export type AnyQuery = Query<AnyDB, AnyTable>;
