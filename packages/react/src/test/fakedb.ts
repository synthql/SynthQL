export interface DB {
    users: {
        id: string;
        name: string;
    };
}

import { query } from '@synthql/queries';

export const from = query<DB>().from;
