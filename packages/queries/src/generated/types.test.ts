import { T, as } from "vitest/dist/reporters-O4LBziQ_.js";
import { query } from "../query";
import { Column } from "../types/Column";
import { ColumnValue } from "../types/ColumnValue";
import { DB } from "."
import { describe, test } from "vitest"
import { col } from "../col";

function scratchpad() {
    // Step 1: play around with the actual types to form an intuition on the type you want to refactor
    type x = DB['actor']['columns']['actor_id']['type'];

    type xx = ColumnValue<DB, 'actor', 'actor_id'>;
    // Step 2: refactor the type
    // Step 3: write a type test
}

describe('new types test', () => {

    test('should get the right columns', () => {
        type T = Column<DB, 'actor'>;
        const thing: ('actor_id' | 'first_name' | 'last_name' | 'last_update') = fakeThing<T>();
    })

    test('ColumnValue should get the right type for a column in a table', () => {
        type T = ColumnValue<DB, 'actor', 'actor_id'>;
        const thing: number = fakeThing<T>();
    })

    test('col should return the right ref', () => {
        col<DB>('actor.columns')
    })
})

const from = query<DB>().from;

from('actor').columns('actor_id').where({
    actor_id: 1,
})

function fakeThing<T>(): T {
    return undefined as any
}
