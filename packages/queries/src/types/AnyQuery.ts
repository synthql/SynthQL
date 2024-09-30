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
export type AnyTable = string;
/**
 * @deprecated: just use Query
 */
export type AnyQuery = Query;
