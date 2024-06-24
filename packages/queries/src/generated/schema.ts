export const schema = {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    description: "Your database's schema",
    type: 'object',
    properties: {
        customer: {
            type: 'object',
            description:
                'Table details:\n\n- Schema: public\n- Table: customer',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        customer_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: customer\n- Column: customer_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        store_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: customer\n- Column: store_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        first_name: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: customer\n- Column: first_name\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_name: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: customer\n- Column: last_name\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        email: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: customer\n- Column: email\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        address_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: customer\n- Column: address_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        activebool: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: customer\n- Column: activebool\n- PG type: pg_catalog.bool\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.bool',
                                    type: 'boolean',
                                    description: 'A PG bool',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        create_date: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: customer\n- Column: create_date\n- PG type: pg_catalog.date\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.date',
                                    type: 'string',
                                    format: 'date',
                                    tsType: 'Date',
                                    description: 'A PG date',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: customer\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        active: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: customer\n- Column: active\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: [
                        'customer_id',
                        'store_id',
                        'first_name',
                        'last_name',
                        'email',
                        'address_id',
                        'activebool',
                        'create_date',
                        'last_update',
                        'active',
                    ],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        actor: {
            type: 'object',
            description: 'Table details:\n\n- Schema: public\n- Table: actor',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        actor_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: actor\n- Column: actor_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        first_name: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: actor\n- Column: first_name\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_name: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: actor\n- Column: last_name\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: actor\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: [
                        'actor_id',
                        'first_name',
                        'last_name',
                        'last_update',
                    ],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        category: {
            type: 'object',
            description:
                'Table details:\n\n- Schema: public\n- Table: category',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        category_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: category\n- Column: category_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        name: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: category\n- Column: name\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: category\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: ['category_id', 'name', 'last_update'],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        film: {
            type: 'object',
            description: 'Table details:\n\n- Schema: public\n- Table: film',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        film_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: film_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        title: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: title\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        description: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: description\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        release_year: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: release_year\n- PG type: public.year\n- PG kind: domain\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'public.year.domain',
                                    type: 'integer',
                                    description:
                                        'The year domain from the public schema',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        language_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: language_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        original_language_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: original_language_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        rental_duration: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: rental_duration\n- PG type: pg_catalog.int2\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int2',
                                    type: 'integer',
                                    minimum: -32768,
                                    maximum: 32767,
                                    description: 'A PG int2',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        rental_rate: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: rental_rate\n- PG type: pg_catalog.numeric\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.numeric',
                                    type: 'number',
                                    description: 'A PG numeric',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        length: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: length\n- PG type: pg_catalog.int2\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int2',
                                    type: 'integer',
                                    minimum: -32768,
                                    maximum: 32767,
                                    description: 'A PG int2',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        replacement_cost: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: replacement_cost\n- PG type: pg_catalog.numeric\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.numeric',
                                    type: 'number',
                                    description: 'A PG numeric',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        rating: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: rating\n- PG type: public.mpaa_rating\n- PG kind: enum\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'public.mpaa_rating.enum',
                                    type: 'string',
                                    enum: ['G', 'PG', 'PG-13', 'R', 'NC-17'],
                                    description:
                                        'The mpaa_rating enum from the public schema',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        special_features: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: special_features\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        fulltext: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: fulltext\n- PG type: pg_catalog.tsvector\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.tsvector',
                                    type: 'string',
                                    description: 'A PG tsvector',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: [
                        'film_id',
                        'title',
                        'description',
                        'release_year',
                        'language_id',
                        'original_language_id',
                        'rental_duration',
                        'rental_rate',
                        'length',
                        'replacement_cost',
                        'rating',
                        'last_update',
                        'special_features',
                        'fulltext',
                    ],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        film_actor: {
            type: 'object',
            description:
                'Table details:\n\n- Schema: public\n- Table: film_actor',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        actor_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film_actor\n- Column: actor_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        film_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film_actor\n- Column: film_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film_actor\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: ['actor_id', 'film_id', 'last_update'],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        film_category: {
            type: 'object',
            description:
                'Table details:\n\n- Schema: public\n- Table: film_category',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        film_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film_category\n- Column: film_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        category_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film_category\n- Column: category_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film_category\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: ['film_id', 'category_id', 'last_update'],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        address: {
            type: 'object',
            description: 'Table details:\n\n- Schema: public\n- Table: address',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        address_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: address\n- Column: address_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        address: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: address\n- Column: address\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        address2: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: address\n- Column: address2\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        district: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: address\n- Column: district\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        city_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: address\n- Column: city_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        postal_code: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: address\n- Column: postal_code\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        phone: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: address\n- Column: phone\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: address\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: [
                        'address_id',
                        'address',
                        'address2',
                        'district',
                        'city_id',
                        'postal_code',
                        'phone',
                        'last_update',
                    ],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        city: {
            type: 'object',
            description: 'Table details:\n\n- Schema: public\n- Table: city',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        city_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: city\n- Column: city_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        city: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: city\n- Column: city\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        country_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: city\n- Column: country_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: city\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: ['city_id', 'city', 'country_id', 'last_update'],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        country: {
            type: 'object',
            description: 'Table details:\n\n- Schema: public\n- Table: country',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        country_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: country\n- Column: country_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        country: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: country\n- Column: country\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: country\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: ['country_id', 'country', 'last_update'],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        inventory: {
            type: 'object',
            description:
                'Table details:\n\n- Schema: public\n- Table: inventory',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        inventory_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: inventory\n- Column: inventory_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        film_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: inventory\n- Column: film_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        store_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: inventory\n- Column: store_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: inventory\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: [
                        'inventory_id',
                        'film_id',
                        'store_id',
                        'last_update',
                    ],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        language: {
            type: 'object',
            description:
                'Table details:\n\n- Schema: public\n- Table: language',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        language_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: language\n- Column: language_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        name: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: language\n- Column: name\n- PG type: pg_catalog.bpchar\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.bpchar',
                                    type: 'string',
                                    description: 'A PG bpchar',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: language\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: ['language_id', 'name', 'last_update'],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        payment: {
            type: 'object',
            description: 'Table details:\n\n- Schema: public\n- Table: payment',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        payment_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: payment\n- Column: payment_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        customer_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: payment\n- Column: customer_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        staff_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: payment\n- Column: staff_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        rental_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: payment\n- Column: rental_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        amount: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: payment\n- Column: amount\n- PG type: pg_catalog.numeric\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.numeric',
                                    type: 'number',
                                    description: 'A PG numeric',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        payment_date: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: payment\n- Column: payment_date\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: [
                        'payment_id',
                        'customer_id',
                        'staff_id',
                        'rental_id',
                        'amount',
                        'payment_date',
                    ],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        rental: {
            type: 'object',
            description: 'Table details:\n\n- Schema: public\n- Table: rental',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        rental_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: rental\n- Column: rental_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        rental_date: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: rental\n- Column: rental_date\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        inventory_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: rental\n- Column: inventory_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        customer_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: rental\n- Column: customer_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        return_date: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: rental\n- Column: return_date\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        staff_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: rental\n- Column: staff_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: rental\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: [
                        'rental_id',
                        'rental_date',
                        'inventory_id',
                        'customer_id',
                        'return_date',
                        'staff_id',
                        'last_update',
                    ],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        staff: {
            type: 'object',
            description: 'Table details:\n\n- Schema: public\n- Table: staff',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        staff_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: staff\n- Column: staff_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        first_name: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: staff\n- Column: first_name\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_name: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: staff\n- Column: last_name\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        address_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: staff\n- Column: address_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        email: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: staff\n- Column: email\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        store_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: staff\n- Column: store_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        active: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: staff\n- Column: active\n- PG type: pg_catalog.bool\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.bool',
                                    type: 'boolean',
                                    description: 'A PG bool',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        username: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: staff\n- Column: username\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        password: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: staff\n- Column: password\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: staff\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        picture: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: staff\n- Column: picture\n- PG type: pg_catalog.bytea\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.bytea',
                                    type: 'string',
                                    description: 'A PG bytea',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: [
                        'staff_id',
                        'first_name',
                        'last_name',
                        'address_id',
                        'email',
                        'store_id',
                        'active',
                        'username',
                        'password',
                        'last_update',
                        'picture',
                    ],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        store: {
            type: 'object',
            description: 'Table details:\n\n- Schema: public\n- Table: store',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        store_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: store\n- Column: store_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        manager_staff_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: store\n- Column: manager_staff_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        address_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: store\n- Column: address_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: store\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: [
                        'store_id',
                        'manager_staff_id',
                        'address_id',
                        'last_update',
                    ],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
    },
    required: [
        'customer',
        'actor',
        'category',
        'film',
        'film_actor',
        'film_category',
        'address',
        'city',
        'country',
        'inventory',
        'language',
        'payment',
        'rental',
        'staff',
        'store',
    ],
    additionalProperties: false,
    $defs: {
        'table_customer': {
            type: 'object',
            description:
                'Table details:\n\n- Schema: public\n- Table: customer',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        customer_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: customer\n- Column: customer_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        store_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: customer\n- Column: store_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        first_name: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: customer\n- Column: first_name\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_name: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: customer\n- Column: last_name\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        email: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: customer\n- Column: email\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        address_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: customer\n- Column: address_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        activebool: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: customer\n- Column: activebool\n- PG type: pg_catalog.bool\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.bool',
                                    type: 'boolean',
                                    description: 'A PG bool',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        create_date: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: customer\n- Column: create_date\n- PG type: pg_catalog.date\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.date',
                                    type: 'string',
                                    format: 'date',
                                    tsType: 'Date',
                                    description: 'A PG date',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: customer\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        active: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: customer\n- Column: active\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: [
                        'customer_id',
                        'store_id',
                        'first_name',
                        'last_name',
                        'email',
                        'address_id',
                        'activebool',
                        'create_date',
                        'last_update',
                        'active',
                    ],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        'table_actor': {
            type: 'object',
            description: 'Table details:\n\n- Schema: public\n- Table: actor',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        actor_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: actor\n- Column: actor_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        first_name: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: actor\n- Column: first_name\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_name: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: actor\n- Column: last_name\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: actor\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: [
                        'actor_id',
                        'first_name',
                        'last_name',
                        'last_update',
                    ],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        'table_category': {
            type: 'object',
            description:
                'Table details:\n\n- Schema: public\n- Table: category',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        category_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: category\n- Column: category_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        name: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: category\n- Column: name\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: category\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: ['category_id', 'name', 'last_update'],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        'table_film': {
            type: 'object',
            description: 'Table details:\n\n- Schema: public\n- Table: film',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        film_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: film_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        title: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: title\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        description: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: description\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        release_year: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: release_year\n- PG type: public.year\n- PG kind: domain\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'public.year.domain',
                                    type: 'integer',
                                    description:
                                        'The year domain from the public schema',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        language_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: language_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        original_language_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: original_language_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        rental_duration: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: rental_duration\n- PG type: pg_catalog.int2\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int2',
                                    type: 'integer',
                                    minimum: -32768,
                                    maximum: 32767,
                                    description: 'A PG int2',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        rental_rate: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: rental_rate\n- PG type: pg_catalog.numeric\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.numeric',
                                    type: 'number',
                                    description: 'A PG numeric',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        length: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: length\n- PG type: pg_catalog.int2\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int2',
                                    type: 'integer',
                                    minimum: -32768,
                                    maximum: 32767,
                                    description: 'A PG int2',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        replacement_cost: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: replacement_cost\n- PG type: pg_catalog.numeric\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.numeric',
                                    type: 'number',
                                    description: 'A PG numeric',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        rating: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: rating\n- PG type: public.mpaa_rating\n- PG kind: enum\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'public.mpaa_rating.enum',
                                    type: 'string',
                                    enum: ['G', 'PG', 'PG-13', 'R', 'NC-17'],
                                    description:
                                        'The mpaa_rating enum from the public schema',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        special_features: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: special_features\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        fulltext: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film\n- Column: fulltext\n- PG type: pg_catalog.tsvector\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.tsvector',
                                    type: 'string',
                                    description: 'A PG tsvector',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: [
                        'film_id',
                        'title',
                        'description',
                        'release_year',
                        'language_id',
                        'original_language_id',
                        'rental_duration',
                        'rental_rate',
                        'length',
                        'replacement_cost',
                        'rating',
                        'last_update',
                        'special_features',
                        'fulltext',
                    ],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        'table_film_actor': {
            type: 'object',
            description:
                'Table details:\n\n- Schema: public\n- Table: film_actor',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        actor_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film_actor\n- Column: actor_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        film_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film_actor\n- Column: film_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film_actor\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: ['actor_id', 'film_id', 'last_update'],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        'table_film_category': {
            type: 'object',
            description:
                'Table details:\n\n- Schema: public\n- Table: film_category',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        film_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film_category\n- Column: film_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        category_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film_category\n- Column: category_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: film_category\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: ['film_id', 'category_id', 'last_update'],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        'table_address': {
            type: 'object',
            description: 'Table details:\n\n- Schema: public\n- Table: address',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        address_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: address\n- Column: address_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        address: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: address\n- Column: address\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        address2: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: address\n- Column: address2\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        district: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: address\n- Column: district\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        city_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: address\n- Column: city_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        postal_code: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: address\n- Column: postal_code\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        phone: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: address\n- Column: phone\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: address\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: [
                        'address_id',
                        'address',
                        'address2',
                        'district',
                        'city_id',
                        'postal_code',
                        'phone',
                        'last_update',
                    ],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        'table_city': {
            type: 'object',
            description: 'Table details:\n\n- Schema: public\n- Table: city',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        city_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: city\n- Column: city_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        city: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: city\n- Column: city\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        country_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: city\n- Column: country_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: city\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: ['city_id', 'city', 'country_id', 'last_update'],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        'table_country': {
            type: 'object',
            description: 'Table details:\n\n- Schema: public\n- Table: country',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        country_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: country\n- Column: country_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        country: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: country\n- Column: country\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: country\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: ['country_id', 'country', 'last_update'],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        'table_inventory': {
            type: 'object',
            description:
                'Table details:\n\n- Schema: public\n- Table: inventory',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        inventory_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: inventory\n- Column: inventory_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        film_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: inventory\n- Column: film_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        store_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: inventory\n- Column: store_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: inventory\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: [
                        'inventory_id',
                        'film_id',
                        'store_id',
                        'last_update',
                    ],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        'table_language': {
            type: 'object',
            description:
                'Table details:\n\n- Schema: public\n- Table: language',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        language_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: language\n- Column: language_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        name: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: language\n- Column: name\n- PG type: pg_catalog.bpchar\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.bpchar',
                                    type: 'string',
                                    description: 'A PG bpchar',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: language\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: ['language_id', 'name', 'last_update'],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        'table_payment': {
            type: 'object',
            description: 'Table details:\n\n- Schema: public\n- Table: payment',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        payment_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: payment\n- Column: payment_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        customer_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: payment\n- Column: customer_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        staff_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: payment\n- Column: staff_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        rental_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: payment\n- Column: rental_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        amount: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: payment\n- Column: amount\n- PG type: pg_catalog.numeric\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.numeric',
                                    type: 'number',
                                    description: 'A PG numeric',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        payment_date: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: payment\n- Column: payment_date\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: [
                        'payment_id',
                        'customer_id',
                        'staff_id',
                        'rental_id',
                        'amount',
                        'payment_date',
                    ],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        'table_rental': {
            type: 'object',
            description: 'Table details:\n\n- Schema: public\n- Table: rental',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        rental_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: rental\n- Column: rental_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        rental_date: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: rental\n- Column: rental_date\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        inventory_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: rental\n- Column: inventory_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        customer_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: rental\n- Column: customer_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        return_date: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: rental\n- Column: return_date\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        staff_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: rental\n- Column: staff_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: rental\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: [
                        'rental_id',
                        'rental_date',
                        'inventory_id',
                        'customer_id',
                        'return_date',
                        'staff_id',
                        'last_update',
                    ],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        'table_staff': {
            type: 'object',
            description: 'Table details:\n\n- Schema: public\n- Table: staff',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        staff_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: staff\n- Column: staff_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        first_name: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: staff\n- Column: first_name\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_name: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: staff\n- Column: last_name\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        address_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: staff\n- Column: address_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        email: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: staff\n- Column: email\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        store_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: staff\n- Column: store_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        active: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: staff\n- Column: active\n- PG type: pg_catalog.bool\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.bool',
                                    type: 'boolean',
                                    description: 'A PG bool',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        username: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: staff\n- Column: username\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        password: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: staff\n- Column: password\n- PG type: pg_catalog.text\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                    description: 'A PG text',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: staff\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        picture: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: staff\n- Column: picture\n- PG type: pg_catalog.bytea\n- PG kind: base\n- Nullable: true\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.bytea',
                                    type: 'string',
                                    description: 'A PG bytea',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: [
                        'staff_id',
                        'first_name',
                        'last_name',
                        'address_id',
                        'email',
                        'store_id',
                        'active',
                        'username',
                        'password',
                        'last_update',
                        'picture',
                    ],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        'table_store': {
            type: 'object',
            description: 'Table details:\n\n- Schema: public\n- Table: store',
            properties: {
                columns: {
                    type: 'object',
                    properties: {
                        store_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: store\n- Column: store_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
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
                        },
                        manager_staff_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: store\n- Column: manager_staff_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        address_id: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: store\n- Column: address_id\n- PG type: pg_catalog.int4\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                    minimum: -2147483648,
                                    maximum: 2147483647,
                                    description: 'A PG int4',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                        last_update: {
                            type: 'object',
                            description:
                                'Column details:\n\n- Schema: public\n- Table: store\n- Column: last_update\n- PG type: pg_catalog.timestamptz\n- PG kind: base\n- Nullable: false\n- Generated: NEVER',
                            properties: {
                                type: {
                                    id: 'pg_catalog.timestamptz',
                                    type: 'string',
                                    format: 'date-time',
                                    tsType: 'Date',
                                    description: 'A PG timestamptz',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                includable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                nullable: {
                                    type: 'boolean',
                                    const: false,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: false,
                                },
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
                        },
                    },
                    required: [
                        'store_id',
                        'manager_staff_id',
                        'address_id',
                        'last_update',
                    ],
                    additionalProperties: false,
                },
            },
            required: ['columns'],
            additionalProperties: false,
        },
        'pg_catalog.text': {
            id: 'pg_catalog.text',
            type: 'string',
            description: 'A PG text',
        },
        'pg_catalog.varchar': {
            id: 'pg_catalog.varchar',
            type: 'string',
            description: 'A PG varchar',
        },
        'pg_catalog.bool': {
            id: 'pg_catalog.bool',
            type: 'boolean',
            description: 'A PG bool',
        },
        'pg_catalog.date': {
            id: 'pg_catalog.date',
            type: 'string',
            format: 'date',
            tsType: 'Date',
            description: 'A PG date',
        },
        'pg_catalog.timestamp': {
            id: 'pg_catalog.timestamp',
            type: 'string',
            format: 'date-time',
            tsType: 'Date',
            description: 'A PG timestamp',
        },
        'pg_catalog.timestamptz': {
            id: 'pg_catalog.timestamptz',
            type: 'string',
            format: 'date-time',
            tsType: 'Date',
            description: 'A PG timestamptz',
        },
        'pg_catalog.numeric': {
            id: 'pg_catalog.numeric',
            type: 'number',
            description: 'A PG numeric',
        },
        'pg_catalog.int2': {
            id: 'pg_catalog.int2',
            type: 'integer',
            minimum: -32768,
            maximum: 32767,
            description: 'A PG int2',
        },
        'pg_catalog.int4': {
            id: 'pg_catalog.int4',
            type: 'integer',
            minimum: -2147483648,
            maximum: 2147483647,
            description: 'A PG int4',
        },
        'pg_catalog.int8': {
            id: 'pg_catalog.int8',
            type: 'integer',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            description: 'A PG int8',
        },
        'pg_catalog.float4': {
            id: 'pg_catalog.float4',
            type: 'number',
            description: 'A PG float4',
        },
        'pg_catalog.float8': {
            id: 'pg_catalog.float8',
            type: 'number',
            description: 'A PG float8',
        },
        'pg_catalog.tsvector': {
            id: 'pg_catalog.tsvector',
            type: 'string',
            description: 'A PG tsvector',
        },
        'pg_catalog.bpchar': {
            id: 'pg_catalog.bpchar',
            type: 'string',
            description: 'A PG bpchar',
        },
        'pg_catalog.bytea': {
            id: 'pg_catalog.bytea',
            type: 'string',
            description: 'A PG bytea',
        },
        'pg_catalog.uuid': {
            id: 'pg_catalog.uuid',
            type: 'string',
            format: 'uuid',
            description: 'A PG uuid',
        },
        'pg_catalog.json': {
            id: 'pg_catalog.json',
            type: 'object',
            description: 'A PG json',
        },
        'pg_catalog.jsonb': {
            id: 'pg_catalog.jsonb',
            type: 'object',
            description: 'A PG jsonb',
        },
        'public.mpaa_rating.enum': {
            id: 'public.mpaa_rating.enum',
            type: 'string',
            enum: ['G', 'PG', 'PG-13', 'R', 'NC-17'],
            description: 'The mpaa_rating enum from the public schema',
        },
        'public.bıgınt.domain': {
            id: 'public.bıgınt.domain',
            type: 'integer',
            description: 'The bıgınt domain from the public schema',
        },
        'public.year.domain': {
            id: 'public.year.domain',
            type: 'integer',
            description: 'The year domain from the public schema',
        },
    },
} as const;
