import { QueryEngine, collectFirst } from "../"
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

    'information_schema.key_column_usage': {
        table_name: string;
        table_schema: string;
        column_name: string;
        constraint_name: string;
        constraint_schema: string;
    };

    'information_schema.table_constraints': {
        table_schema: string;
        table_name: string;
        constraint_name: string;
        constraint_schema: string;
        constraint_type: string;
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

export type IntrospectSchemaConfig = {
    schemas: string[]
}

const from = query<PgSchema>().from;


export interface TableDef {
    name: string;
    columns: {
        [columnName: string]: ColumnDef
    },
    primaryKey: string[];
}
export interface ColumnDef {
    name: string;
    type: {
        name: string;
        schema: string;
    }
    nullable: boolean;
}

export interface EnumDef {
    name: string;
    values: string[];
}

export async function introspectSchema(queryEngine: QueryEngine<PgSchema>, config: IntrospectSchemaConfig): Promise<{
    tables: TableDef[],
    enums: EnumDef[]
}> {

    const [tables, primaryKeys, enums] = await Promise.all([
        collectFirst(queryEngine.execute(findTableSchema(config))),
        collectFirst(queryEngine.execute(findPrimaryKeyConstraints(config))),
        collectFirst(queryEngine.execute(findEnums(config)))
    ])

    return {
        tables: (tables).map((table): TableDef => {

            const primaryKey = primaryKeys.filter(k => {
                return k.table_schema === table.table_schema && k.table_name === table.table_name
            }).map(k => k.keys.map(k => k.column_name))[0]

            const columns = table.columns.map((col): ColumnDef => {
                return {
                    name: col.column_name,
                    nullable: col.is_nullable === 'YES',
                    type: {
                        name: col.udt_name,
                        schema: col.udt_schema
                    }
                }
            });

            const columnsByName = columns.reduce((acc: TableDef['columns'], col) => {
                acc[col.name] = col;
                return acc;
            }, {})

            return {
                name: table.table_schema + '.' + table.table_name,
                columns: columnsByName,
                primaryKey,
            }
        }),
        enums: enums
            .filter(e => e.enumValues.length > 0)
            .map(e => {
                return {
                    name: e.typname,
                    values: e.enumValues.map(e => e.enumlabel)
                }
            })
    }
}

function findPrimaryKeyConstraints(config: IntrospectSchemaConfig) {
    const keys = from('information_schema.key_column_usage')
        .columns('column_name', 'table_name')
        .where({
            constraint_schema: col('information_schema.table_constraints.constraint_schema'),
            constraint_name: col('information_schema.table_constraints.constraint_name'),
            table_schema: col('information_schema.table_constraints.table_schema'),
            table_name: col('information_schema.table_constraints.table_name')
        })
        .many()

    return from('information_schema.table_constraints')
        .columns('table_schema', 'table_name', 'constraint_schema', 'constraint_name')
        .where({
            constraint_type: 'PRIMARY KEY',
            table_schema: {
                in: config.schemas
            }
        })
        .include({
            keys
        })
        .groupingId('constraint_schema', 'constraint_name', 'table_schema', 'table_name')
        .many()
}

function findTableSchema(config: IntrospectSchemaConfig) {
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
            columns,
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

function findEnums(config: IntrospectSchemaConfig) {
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