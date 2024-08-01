import { query } from '@synthql/queries';

export interface DB {
    users: {
        id: {
            type: number;
            selectable: true;
            includable: true;
            whereable: true;
            nullable: false;
            isPrimaryKey: true;
        };
        name: {
            type: string;
            selectable: true;
            includable: true;
            whereable: true;
            nullable: false;
            isPrimaryKey: false;
        };
    };
}

const schema = {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    type: 'object',
    description: "Your database's schema",
    required: [],
    additionalProperties: false,
    $defs: {},
    properties: {
        users: {
            type: 'object',
            description: '',
            required: [],
            additionalProperties: false,
            properties: {
                columns: {
                    type: 'object',
                    description: '',
                    required: [],
                    additionalProperties: false,
                    properties: {
                        id: {
                            type: '',
                            description: '',
                            required: [],
                            additionalProperties: false,
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
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
                        },
                        name: {
                            type: '',
                            description: '',
                            required: [],
                            additionalProperties: false,
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
                        },
                    },
                },
            },
        },
    },
};

export const from = query<DB>(schema).from;
