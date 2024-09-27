import { JSONSchemaType } from 'ajv';
import { CliConfig } from '../types/CliConfig';

export const schemaDefOverridesSchema: JSONSchemaType<
    CliConfig['schemaDefOverrides']
> = {
    $schema: 'http://json-schema.org/draft-07/schema',
    description: [
        'The table definitions for any tables you want',
        'to be overriden during the schema generation.',
        `e.g.:`,
        `"schemaDefOverrides": {
            "public.actor": {
                "name": {
                    "includable": { "type": "boolean", "const": false }
                },
            },
            "accounts.customer": {
                "quantity": {
                    "type": {
                        "type": "object",
                        "id": "QuantityUnit",
                        "properties": {
                            "unit": {
                                "type": "string",
                                "description": "A unit string, property in JSONB object"
                            }
                        },
                        "description": "A QuantityUnit object, casted from a JSONB column"
                    }
                },
            },
        }`,
    ].join('\n'),
    type: 'object',
    patternProperties: {
        '^[^.]+.[^.]+$': {
            type: 'object',
            description: [
                'The column definitions for each table to be overriden.',
                'The key for each table should be the qualified name for the table,',
                'in the form `${schemaName}.${tableName}` e.g `public.users`',
            ].join('\n'),
            patternProperties: {
                '^[^.]+$': {
                    description: [
                        'The attribute definitions for each column to be overriden.',
                        'The key for each column should be the name of the column,',
                        'in the form `${columnName}` e.g `first_name`',
                    ].join('\n'),
                    type: 'object',
                    properties: {
                        type: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'string',
                                },
                                type: {
                                    type: 'string',
                                },
                                title: {
                                    type: 'string',
                                    nullable: true,
                                },
                                description: {
                                    type: 'string',
                                    nullable: true,
                                },
                                items: {
                                    type: 'object',
                                    properties: {
                                        type: {
                                            type: 'string',
                                        },
                                    },
                                    nullable: true,
                                    required: ['type'],
                                    additionalProperties: true,
                                },
                                tsType: {
                                    type: 'string',
                                    nullable: true,
                                },
                                minimum: {
                                    type: 'number',
                                    nullable: true,
                                },
                                maximum: {
                                    type: 'number',
                                    nullable: true,
                                },
                                format: {
                                    type: 'string',
                                    nullable: true,
                                },
                                enum: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                    },
                                    nullable: true,
                                },
                                properties: {
                                    type: 'object',
                                    patternProperties: {
                                        '^[^.]+$': {
                                            description: [
                                                'The property definitions for each object property to be overriden.',
                                                'The key for each property should be the name of the property,',
                                                'in the form `${propertyName}` e.g `unit`',
                                            ].join('\n'),
                                            type: 'object',
                                            properties: {
                                                type: {
                                                    type: 'string',
                                                },
                                                id: {
                                                    type: 'string',
                                                    nullable: true,
                                                },
                                                description: {
                                                    type: 'string',
                                                    nullable: true,
                                                },
                                                title: {
                                                    type: 'string',
                                                    nullable: true,
                                                },
                                                items: {
                                                    type: 'object',
                                                    properties: {
                                                        type: {
                                                            type: 'string',
                                                        },
                                                    },
                                                    nullable: true,
                                                    required: ['type'],
                                                    additionalProperties: true,
                                                },
                                                tsType: {
                                                    type: 'string',
                                                    nullable: true,
                                                },
                                                minimum: {
                                                    type: 'number',
                                                    nullable: true,
                                                },
                                                maximum: {
                                                    type: 'number',
                                                    nullable: true,
                                                },
                                                format: {
                                                    type: 'string',
                                                    nullable: true,
                                                },
                                                enum: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'string',
                                                    },
                                                    nullable: true,
                                                },
                                            },
                                            required: ['type'],
                                            additionalProperties: true,
                                        },
                                    },
                                    nullable: true,
                                    required: [],
                                    additionalProperties: true,
                                },
                            },
                            nullable: true,
                            required: ['id', 'type'],
                            additionalProperties: true,
                        },
                        selectable: {
                            type: 'object',
                            properties: {
                                type: {
                                    type: 'string',
                                },
                                const: {
                                    type: 'boolean',
                                },
                            },
                            nullable: true,
                            required: ['type', 'const'],
                            additionalProperties: true,
                        },
                        includable: {
                            type: 'object',
                            properties: {
                                type: {
                                    type: 'string',
                                },
                                const: {
                                    type: 'boolean',
                                },
                            },
                            nullable: true,
                            required: ['type', 'const'],
                            additionalProperties: true,
                        },
                        whereable: {
                            type: 'object',
                            properties: {
                                type: {
                                    type: 'string',
                                },
                                const: {
                                    type: 'boolean',
                                },
                            },
                            nullable: true,
                            required: ['type', 'const'],
                            additionalProperties: true,
                        },
                        nullable: {
                            type: 'object',
                            properties: {
                                type: {
                                    type: 'string',
                                },
                                const: {
                                    type: 'boolean',
                                },
                            },
                            nullable: true,
                            required: ['type', 'const'],
                            additionalProperties: true,
                        },
                        isPrimaryKey: {
                            type: 'object',
                            properties: {
                                type: {
                                    type: 'string',
                                },
                                const: {
                                    type: 'boolean',
                                },
                            },
                            nullable: true,
                            required: ['type', 'const'],
                            additionalProperties: true,
                        },
                    },
                    required: [],
                    additionalProperties: true,
                },
            },
            required: [],
            additionalProperties: true,
        },
    },
    required: [],
    additionalProperties: true,
};

export const configFileSchema: JSONSchemaType<Partial<CliConfig>> = {
    $schema: 'http://json-schema.org/draft-07/schema',
    type: 'object',
    properties: {
        $schema: {
            type: 'string',
            description: [
                'Specifies which draft of the JSON Schema standard',
                'the schema adheres to',
            ].join('\n'),
            nullable: true,
        },
        out: {
            type: 'string',
            description: [
                'The output directory for the generated files',
                'e.g. `src/generated`',
            ].join('\n'),
            nullable: true,
        },
        defaultSchema: {
            type: 'string',
            description: [
                'The default schema to use e.g. `public`',
                'This is similar to the `search_path` in PostgreSQL',
            ].join('\n'),
            nullable: true,
        },
        schemas: {
            type: 'array',
            description: [
                'The schemas to include in generation',
                'e.g. `["public", "company_name"]`',
            ].join('\n'),
            items: {
                type: 'string',
            },
            nullable: true,
        },
        tables: {
            type: 'array',
            description: [
                'The tables to include in generation',
                'e.g. `["users", "accounts"]`',
            ].join('\n'),
            items: {
                type: 'string',
            },
            nullable: true,
        },
        schemaDefOverrides: {
            ...schemaDefOverridesSchema,
            nullable: true,
        },
    },
    required: [],
    additionalProperties: true,
};
