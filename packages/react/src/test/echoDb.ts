export interface DB {
    users: {
        id: string;
        name: string;
    };
}

const schema = {
    $schema: '',
    type: '',
    description: '',
    required: [],
    additionalProperties: false,
    $defs: {},
    properties: {
        users: {
            type: '',
            description: '',
            required: [],
            additionalProperties: false,
            properties: {
                columns: {
                    type: '',
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

import { query } from '@synthql/queries';

export const from = query<DB>(schema).from;
