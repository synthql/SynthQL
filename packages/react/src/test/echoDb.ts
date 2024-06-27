export interface DB {
    users: {
        id: string;
        name: string;
    };
}

const schema = {
    properties: {
        users: {
            properties: {
                columns: {
                    properties: {
                        id: {
                            properties: {
                                type: {
                                    id: 'pg_catalog.int4',
                                    type: 'integer',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                isPrimaryKey: {
                                    type: 'boolean',
                                    const: true,
                                },
                            },
                        },
                        name: {
                            properties: {
                                type: {
                                    id: 'pg_catalog.text',
                                    type: 'string',
                                },
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                                whereable: {
                                    type: 'boolean',
                                    const: true,
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
