import { describe, expect, test } from 'vitest';
import { Pool, types } from 'pg';
import Ajv2020 from 'ajv/dist/2020';
import { JSONSchema } from '@apidevtools/json-schema-ref-parser';
import { generate } from '../generate';

// Database connection configuration
const client = new Pool({
    connectionString: 'postgresql://postgres:postgres@localhost:5432/postgres',
    max: 10,
});

// Use the OIDs imported from pg.types to set custom type parsers
// We're replicating the behaviour in the PgExecutor
// here so it matches the adjustments we made in
// wellKnownDefs for values of these types
types.setTypeParser(types.builtins.DATE, (value) => value);
types.setTypeParser(types.builtins.TIMESTAMP, (value) => value);
types.setTypeParser(types.builtins.TIMESTAMPTZ, (value) => value);

const ajv = new Ajv2020({ allErrors: true, strict: false });

describe('pg_types', () => {
    test('Add to Pagila', async () => {
        const tableName = 'all_data_types';

        await client.connect();

        try {
            await createTable();
            await insertData();

            // Generate schema in `introspect` package
            const { schema } = await generate({
                connectionString:
                    'postgresql://postgres:postgres@localhost:5432/postgres',
                includeSchemas: ['public'],
                defaultSchema: 'public',
                includeTables: [tableName],
                outDir: '../introspect/src/tests/generated',
            });

            for (const row of await selectAllRows()) {
                checkRowSchema(schema, tableName, row);
            }
        } finally {
            await dropTable();
        }
    }, 100_000);
});

function checkRowSchema(
    schema: JSONSchema,
    tableName: string,
    row: unknown,
): void {
    for (const [name, value] of Object.entries(row ?? {})) {
        const columnType = (schema.properties?.[tableName] as any)?.properties
            ?.columns?.properties?.[name]?.properties?.type;

        if (!columnType) {
            throw new Error(`Column type not found for ${name}`);
        }

        const { id, ...columnTypeWithoutId } = columnType;

        const validateColumnTypeSchema = ajv.compile(columnTypeWithoutId);

        expect(validateColumnTypeSchema(value)).toEqual(true);
    }
}

const createTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS all_data_types (
            ${allKnownTypes()
                .map((column) => `${getColumnName(column.type)} ${column.type}`)
                .join(',')}
        );
    `;

    await client.query(createTableQuery);
};

const insertData = async () => {
    const insertDataQuery = `
        INSERT INTO all_data_types (
            ${allKnownTypes()
                .map((column) => `${getColumnName(column.type)}`)
                .join(',')}
        ) VALUES (
            ${allKnownTypes()
                .map((column) => `${column.examples[0]}`)
                .join(',')}
        );
    `;
    await client.query(insertDataQuery);
};

const selectAllRows = async (): Promise<{}[]> => {
    const selectDataQuery = `
        SELECT
            ${allKnownTypes()
                .map((column) => `${getColumnName(column.type)}`)
                .join(',')}
        FROM
            all_data_types;
    `;

    const { rows } = await client.query<{}>(selectDataQuery);
    return rows;
};

const dropTable = async (): Promise<void> => {
    await client.query(`DROP TABLE IF EXISTS all_data_types`);
};

interface KnownTypes {
    type: string;
    examples: string[];
}

/**
 * Returns a list of all known types and their examples. This is used to
 * test that synthql's introspection correctly identifies the types and
 * their values.
 */
function allKnownTypes(): Array<KnownTypes> {
    return [
        { type: 'SERIAL PRIMARY KEY', examples: ['1', '2147483647'] },
        {
            type: 'BIGINT',
            examples: ['-9223372036854775808', '9223372036854775807'],
        },
        { type: 'BIGSERIAL', examples: ['1', '9223372036854775807'] },
        { type: 'BIT(1)', examples: ["B'0'", "B'1'"] },
        { type: 'BIT VARYING(10)', examples: ["B'0000'", "B'1010'"] },
        { type: 'BOOLEAN', examples: ['TRUE', 'FALSE'] },
        { type: 'BOX', examples: ["'((0,0),(1,1))'", "'((0,0),(2,2))'"] },
        { type: 'BYTEA', examples: ["'\xDEADBEEA'", "'\xDEADBEEF'"] },
        { type: 'CHARACTER(10)', examples: ["'CHAR(00)  '", "'CHAR(10)  '"] },
        {
            type: 'CHARACTER VARYING(50)',
            examples: ["'VARCHAR'", "'VARCHARS'"],
        },
        {
            type: 'CIDR',
            examples: ["'192.168.100.128/25'", "'192.168.100.128/25'"],
        },
        { type: 'CIRCLE', examples: ["'<(0,0),1>'", "'<(0,0),2>'"] },
        { type: 'DATE', examples: ["'2023-05-18'", "'2023-05-19'"] },
        {
            type: 'DOUBLE PRECISION',
            examples: ['3.14159265358978', '3.14159265358979'],
        },
        { type: 'INET', examples: ["'192.168.100.127'", "'192.168.100.128'"] },
        { type: 'INTEGER', examples: ['-2147483648', '2147483647'] },
        {
            type: 'INTERVAL',
            examples: [
                "'1 year 2 months 3 days 4 hours 5 minutes 5 seconds'",
                "'1 year 2 months 3 days 4 hours 5 minutes 6 seconds'",
            ],
        },
        {
            type: 'JSON',
            examples: [`'{"key": "value1"}'`, `'{"key": "value2"}'`],
        },
        {
            type: 'JSONB',
            examples: [`'{"key": "value1"}'`, `'{"key": "value2"}'`],
        },
        { type: 'LINE', examples: ["'{1,-1,2}'", "'{1,-1,3}'"] },
        { type: 'LSEG', examples: ["'[(0,0),(1,1)]'", "'[(0,0),(2,2)]'"] },
        {
            type: 'MACADDR',
            examples: ["'08:00:2b:01:02:03'", "'08:00:2b:01:02:04'"],
        },
        {
            type: 'MACADDR8',
            examples: [
                "'08:00:2b:01:02:03:04:05'",
                "'08:00:2b:01:02:03:04:06'",
            ],
        },
        { type: 'MONEY', examples: ['19.98', '19.99'] },
        {
            type: 'NUMERIC(10, 2)',
            examples: ['3.14159265358978', '3.14159265358979'],
        },
        {
            type: 'PATH',
            examples: ["'[(0,0),(1,1),(2,2)]'", "'[(0,0),(1,1),(3,3)]'"],
        },
        { type: 'PG_LSN', examples: ["'16/B374D847'", "'16/B374D848'"] },
        {
            type: 'PG_SNAPSHOT',
            examples: ["'10:20:10,14,15'", "'10:20:10,14,15'"],
        },
        { type: 'POINT', examples: ["'(1,1)'", "'(1,1)'"] },
        {
            type: 'POLYGON',
            examples: [
                "'((0,0),(0,1),(1,1),(1,0))'",
                "'((0,0),(0,1),(1,1),(1,0))'",
            ],
        },
        { type: 'REAL', examples: ['3.14', '3.15'] },
        { type: 'SMALLINT', examples: ['-32768', '32767'] },
        { type: 'SMALLSERIAL', examples: ['1', '32767'] },
        { type: 'SERIAL', examples: ['1', '2147483647'] },
        {
            type: 'TEXT',
            examples: [
                "'This is a text column'",
                "'This is another text column'",
            ],
        },
        { type: 'TIME', examples: ["'04:05:06'", "'04:05:08'"] },
        {
            type: 'TIME WITH TIME ZONE',
            examples: ["'04:05:06 PST'", "'04:05:08 PST'"],
        },
        {
            type: 'TIMESTAMP',
            examples: ["'2023-05-18 04:05:06'", "'2023-05-18 04:05:08'"],
        },
        {
            type: 'TIMESTAMP WITH TIME ZONE',
            examples: [
                "'2023-05-18 04:05:06 PST'",
                "'2023-05-18 04:05:08 PST'",
            ],
        },
        { type: 'TSQUERY', examples: ["'fat & mat'", "'fat & pat'"] },
        {
            type: 'TSVECTOR',
            examples: [
                "'a fat cat sat on a mat and ate a fat rat'",
                "'a fat cat sat on a mat and ate a fat tat'",
            ],
        },
        {
            type: 'TXID_SNAPSHOT',
            examples: ["'10:20:10,14,15'", "'10:20:10,14,15'"],
        },
        {
            type: 'UUID',
            examples: [
                "'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'",
                "'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'",
            ],
        },
        {
            type: 'XML',
            examples: [
                "'<root><element>value</element></root>'",
                "'<root><element>value</element></root>'",
            ],
        },
    ];
}

function getColumnName(type: string) {
    return `col_${type
        .replace(/[ ]/g, '_')
        .replace(/[(),]+/g, '')
        .toLowerCase()}`;
}
