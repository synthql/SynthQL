export interface DB {
    users: {
        id: string;
        name: string;
    };
}

export const schema = {
    properties: {
        users: {
            properties: {
                columns: {
                    properties: {
                        id: {
                            properties: {
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                            },
                        },
                        name: {
                            properties: {
                                selectable: {
                                    type: 'boolean',
                                    const: true,
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
