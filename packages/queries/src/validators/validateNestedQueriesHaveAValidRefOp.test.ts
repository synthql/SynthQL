import { describe, expect, test } from 'vitest';
import { col } from '../col';
import { from } from '../generated';

describe('validateNestedQueriesHaveAValidRefO', () => {
    test('Check that included query without RefOp where clause throws', () => {
        expect(() =>
            from('film')
                .include({
                    lang: from('language').many(),
                })
                .many(),
        ).toThrow('Nested query missing RefOp where clause error!');
    });

    test('Check that included query with RefOp where clause does not throw', () => {
        expect(() =>
            from('film')
                .include({
                    lang: from('language')
                        .where({
                            language_id: col('film.language_id'),
                        })
                        .many(),
                })
                .many(),
        ).not.toThrow();
    });
});