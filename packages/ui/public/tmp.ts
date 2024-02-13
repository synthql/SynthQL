import { query,col } from "@synthql/queries"

interface DB { 
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

const from = query<DB>().from;

const keys = from('information_schema.key_column_usage')
    .columns('column_name','table_name')
    .where({
        constraint_schema: col('information_schema.table_constraints.constraint_schema'),
        constraint_name: col('information_schema.table_constraints.constraint_name'),
        table_schema: col('information_schema.table_constraints.table_schema'),
        table_name: col('information_schema.table_constraints.table_name')
    })
    .many()

export default from('information_schema.table_constraints')
    .columns('table_schema','table_name','constraint_schema','constraint_name')
    .where({
        constraint_type: 'PRIMARY KEY',
        table_schema: 'public'
    })
    .include({
        keys
    })
    .groupingId('constraint_schema','constraint_name','table_schema','table_name')
    .many()