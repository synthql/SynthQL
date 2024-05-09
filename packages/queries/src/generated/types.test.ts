import { query } from '../query';
import { Column } from '../types/Column';
import { ColumnValue } from '../types/ColumnValue';
import { DB } from '.';
import { describe, test } from 'vitest';
import { col } from '../col';
import { ColumnReference } from '../types/ColumnReference';

describe('New types tests', () => {
    // Step 1: Play around with the actual types to form an intuition on the type you want to refactor
    // Step 2: Refactor the type
    // Step 3: Write a type test

    type x = DB['actor']['columns']['actor_id']['type'];

    type xx = ColumnValue<DB, 'actor', 'actor_id'>;

    const from = query<DB>().from;

    test('Column should get the right column names in a table', () => {
        type T = Column<DB, 'actor'>;
        const thing: 'actor_id' | 'first_name' | 'last_name' | 'last_update' =
            fakeThing<T>();

        from('actor').columns('actor_id');
    });

    test('ColumnValue should get the right type for a column in a table', () => {
        type T = ColumnValue<DB, 'actor', 'actor_id'>;
        const thing: number = fakeThing<T>();

        const from = query<DB>().from;

        from('actor').columns('actor_id').where({
            actor_id: 1,
        });
    });

    test('ColumnReference should return the right reference names for all the columns in all the tables', () => {
        type T = ColumnReference<DB>;
        const thing: string = fakeThing<T>();

        col<DB>('actor.actor_id');
    });
});

function fakeThing<T>(): T {
    return undefined as any;
}
