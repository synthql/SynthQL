import $RefParser from '@apidevtools/json-schema-ref-parser';
import {
    DomainDetails,
    EnumDetails,
    extractSchemas,
    Schema,
    TableColumnType,
    TableDetails,
} from 'extract-pg-schema';
import fs from 'fs';
import { compile, JSONSchema } from 'json-schema-to-typescript';
import path from 'path';

export async function generate({
    connectionString,
    includeSchemas,
    defaultSchema,
    outDir,
    formatter = async (str) => str,
    SECRET_INTERNALS_DO_NOT_USE_queriesImportLocation = '@synthql/queries',
}: {
    defaultSchema: string;
    connectionString: string;
    includeSchemas: string[];
    outDir: string;
    formatter?: (str: string) => Promise<string>;
    SECRET_INTERNALS_DO_NOT_USE_queriesImportLocation?: string;
}) {
    async function writeFormattedFile(path: string, content: string) {
        fs.writeFileSync(path, await formatter(content));
    }

    // Step 1: Use pg-extract-schema to get the schema
    const pgExtractSchema = await extractSchemas(
        {
            connectionString,
        },
        {
            schemas: includeSchemas,
        },
    );

    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    // Step 2: Convert the pg-extract-schema schema to a JSON Schema
    const schemaWithRefs: JSONSchema = createRootJsonSchema(pgExtractSchema, {
        defaultSchema,
    });

    /**
     * Step 3: Compile the JSON schema into TypeScript files.
     * Generate types from the schema with refs.
     * This leads to a more readable output as the types are not inlined.
     */
    const db = await compile(schemaWithRefs, 'DB', {
        additionalProperties: false,
        unreachableDefinitions: false,
    });
    writeFormattedFile(path.join(outDir, 'db.ts'), db);

    /**
     * Generate types from the schema without refs.
     * This leads to a more compact output as the types are inlined.
     */
    const schemaWithoutRefs = await $RefParser.dereference(schemaWithRefs);
    writeFormattedFile(
        path.join(outDir, 'schema.ts'),
        `export const schema = ${JSON.stringify(schemaWithoutRefs, null, 2)} as const`,
    );

    writeFormattedFile(
        path.join(outDir, 'index.ts'),
        [
            `import { query } from '${SECRET_INTERNALS_DO_NOT_USE_queriesImportLocation}';`,
            `import { DB } from './db';`,
            `export { DB } from './db';`,
            `export { schema } from './schema';`,
            `import { schema } from './schema';`,
            `export const from = query<DB>(schema).from;`,
        ].join('\n'),
    );

    return {
        schema: schemaWithoutRefs,
    };
}

function createTypeDefId(type: {
    fullName: string;
    kind: TableColumnType['kind'];
}) {
    if (type.kind === 'base') {
        return type.fullName;
    }
    return `${type.fullName}.${type.kind}`;
}

function createTableDefId(type: TableDetails, defaultSchema: string) {
    if (type.schemaName === defaultSchema) {
        return `table_${type.name}`;
    }
    return `table_${type.schemaName}_${type.name}`;
}

function createTableJsonSchema(table: TableDetails): JSONSchema {
    const empty: Record<string, any> = {};
    const columns = table.columns.reduce((acc, column) => {
        acc[column.name] = {
            type: 'object',
            description:
                column.comment ??
                [
                    'Column details:',
                    '',
                    `- Schema: ${table.schemaName}`,
                    `- Table: ${table.name}`,
                    `- Column: ${column.name}`,
                    `- PG type: ${column.type.fullName}`,
                    `- PG kind: ${column.type.kind}`,
                    `- Nullable: ${column.isNullable}`,
                    `- Generated: ${column.generated}`,
                ].join('\n'),
            properties: {
                type: { $ref: `#/$defs/${createTypeDefId(column.type)}` },
                // a constant value of true
                selectable: { type: 'boolean', const: true },
                includable: { type: 'boolean', const: true },
                whereable: { type: 'boolean', const: true },
                nullable: { type: 'boolean', const: column.isNullable },
                isPrimaryKey: { type: 'boolean', const: column.isPrimaryKey },
            },
            required: [
                'type',
                'selectable',
                'includable',
                'whereable',
                'isPrimaryKey',
                'nullable',
            ],
            additionalProperties: false,
        };
        return acc;
    }, empty);

    return {
        type: 'object',
        description:
            table.comment ??
            [
                'Table details:',
                '',
                `- Schema: ${table.schemaName}`,
                `- Table: ${table.name}`,
            ].join('\n'),
        properties: {
            columns: {
                type: 'object',
                properties: columns,
                required: table.columns.map((column) => column.name),
                additionalProperties: false,
            },
        },
        required: ['columns'],
        additionalProperties: false,
    };
}

function createRootJsonSchema(
    schemas: Record<string, Schema>,
    { defaultSchema }: { defaultSchema: string },
): JSONSchema {
    const tables = Object.values(schemas).flatMap((schema) => {
        return schema.tables;
    });

    const enums = Object.values(schemas).flatMap((schema) => {
        return schema.enums;
    });

    const domains = Object.values(schemas).flatMap((schema) => {
        return schema.domains;
    });

    return {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        description: "Your database's schema",
        type: 'object',
        properties: tables
            .map((table) => {
                return {
                    [fullTableName(table, defaultSchema)]: {
                        $ref: `#/$defs/${createTableDefId(table, defaultSchema)}`,
                    },
                };
            })
            .reduce((acc, table) => {
                return { ...acc, ...table };
            }, {}),
        required: tables.map((table) => fullTableName(table, defaultSchema)),
        additionalProperties: false,
        $defs: {
            ...createTableDefs(tables, defaultSchema),
            ...createWellKnownDefs(),
            ...createEnumJsonSchema(enums),
            ...createDomainJsonSchema(domains),
        },
    };
}

function fullTableName(table: TableDetails, defaultSchema: string) {
    if (table.schemaName === defaultSchema) {
        return table.name;
    }
    return `${table.schemaName}.${table.name}`;
}

function createTableDefs(
    tables: TableDetails[],
    defaultSchema: string,
): Record<string, JSONSchema> {
    const empty: Record<string, JSONSchema> = {};
    return tables.reduce((acc, table) => {
        acc[createTableDefId(table, defaultSchema)] =
            createTableJsonSchema(table);
        return acc;
    }, empty);
}

function createEnumJsonSchema(
    enums: EnumDetails[],
): Record<string, JSONSchema> {
    const empty: Record<string, JSONSchema> = {};
    return enums.reduce((acc, enumType) => {
        acc[
            createTypeDefId({
                kind: 'enum',
                fullName: `${enumType.schemaName}.${enumType.name}`,
            })
        ] = {
            type: 'string',
            enum: enumType.values,
            description:
                enumType.comment ??
                `The ${enumType.name} enum from the ${enumType.schemaName} schema`,
        };
        return acc;
    }, empty);
}

function createDomainJsonSchema(
    domains: DomainDetails[],
): Record<string, JSONSchema> {
    const empty: Record<string, JSONSchema> = {};

    return domains.reduce((acc, domain) => {
        acc[
            createTypeDefId({
                kind: 'domain',
                fullName: `${domain.schemaName}.${domain.name}`,
            })
        ] = {
            // TODO: implement domain type
            type: 'any',
            description:
                domain.comment ??
                `The ${domain.name} enum from the ${domain.schemaName} schema`,
        };
        return acc;
    }, empty);
}

function createWellKnownDefs(): Record<string, JSONSchema> {
    return {
        'pg_catalog.int4': {
            type: 'integer',
            minimum: -2147483648,
            maximum: 2147483647,
            description: 'A PG int4',
        },
        'pg_catalog.text': {
            type: 'string',
            description: 'A PG text',
        },
        'pg_catalog.varchar': {
            type: 'string',
            description: 'A PG varchar',
        },
        'pg_catalog.bool': {
            type: 'boolean',
            description: 'A PG bool',
        },
        'pg_catalog.date': {
            type: 'string',
            format: 'date',
            description: 'A PG date',
        },
        'pg_catalog.timestamptz': {
            type: 'string',
            format: 'date-time',
            description: 'A PG timestamptz',
        },
        'pg_catalog.timestamp': {
            type: 'string',
            format: 'date-time',
            description: 'A PG timestamp',
        },
        'pg_catalog.int2': {
            type: 'integer',
            minimum: -32768,
            maximum: 32767,
            description: 'A PG int2',
        },
        'pg_catalog.int8': {
            type: 'integer',
            minimum: -9223372036854775808,
            maximum: 9223372036854775807,
            description: 'A PG int8',
        },

        'pg_catalog.float4': {
            type: 'number',
            description: 'A PG float4',
        },

        'pg_catalog.numeric': {
            type: 'number',
            description: 'A PG numeric',
        },
        'pg_catalog.float8': {
            type: 'number',
            description: 'A PG float8',
        },

        'pg_catalog.tsvector': {
            type: 'string',
            description: 'A PG tsvector',
        },
        'pg_catalog.bpchar': {
            type: 'string',
            description: 'A PG bpchar',
        },
        'pg_catalog.bytea': {
            type: 'string',
            description: 'A PG bytea',
        },
        'public.year.domain': {
            type: 'integer',
            minimum: 1900,
            maximum: 2155,
            description: 'A PG year',
        },
        'pg_catalog.uuid': {
            type: 'string',
            format: 'uuid',
            description: 'A PG uuid',
        },
        'pg_catalog.jsonb': {
            type: 'object',
            description: 'A PG jsonb',
        },
        'pg_catalog.json': {
            type: 'object',
            description: 'A PG json',
        },
    };
}
