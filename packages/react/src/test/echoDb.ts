export interface DB {
    users: {
        id: string;
        name: string;
    };
}

import { query } from '@synthql/queries';
import { schema } from './echoSchema';

export const from = query<DB>(schema).from;
