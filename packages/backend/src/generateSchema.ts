import { QueryEngine, collectFirst } from "."
import { col, query } from "@synthql/queries"

export interface PgSchema {
    'information_schema.tables': {
        // all columns
        table_name: string;
        table_schema: string;
    };

    'information_schema.columns': {
        // all columns
        column_name: string;
        table_name: string;
        table_schema: string;
        // the type of the column
        data_type: string;
        is_nullable: 'YES' | 'NO';
        udt_name: string;
        udt_schema: string;
        column_default: string | null;
    };

    'pg_catalog.pg_type': {
        typname: string;
        oid: number;
    },

    'pg_catalog.pg_enum': {
        enumtypid: number;
        enumlabel: string;
        enumsortorder: number;
        oid: number;
    };
}

export type GenerateSchemaConfig = {
    schemas: string[]
}

const from = query<PgSchema>().from;




export async function generateSchema(queryEngine: QueryEngine<PgSchema>, config: GenerateSchemaConfig) {


    const tables = collectFirst(queryEngine.execute(findTableSchema(config)));

    const enums = collectFirst(queryEngine.execute(findEnums(config)));

    return {
        tables: await tables,
        enums: (await enums).filter(e => e.enumValues.length > 0)
    }
}

function findTableSchema(config: GenerateSchemaConfig) {
    const columns = from('information_schema.columns')
        .columns('column_name', 'data_type', 'is_nullable', 'udt_name', 'udt_schema')
        .where({
            table_schema: col('information_schema.tables.table_schema'),
            table_name: col('information_schema.tables.table_name')
        })
        .many();

    const q = from('information_schema.tables')
        .columns('table_name', 'table_schema')
        .include({
            columns
        })
        .where({
            table_schema: {
                'in': config.schemas
            }
        })
        .groupingId('table_schema', 'table_name')
        .many()
    return q
}

function findEnums(config: GenerateSchemaConfig) {
    return from('pg_catalog.pg_type')
        .columns('typname')
        .include({
            enumValues: from('pg_catalog.pg_enum')
                .columns('enumlabel')
                .where({
                    enumtypid: col('pg_catalog.pg_type.oid')
                })
                .many()
        })
        .groupingId('typname')
        .many()
}