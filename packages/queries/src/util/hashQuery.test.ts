import { describe, expect, it } from 'vitest';
import { from } from '../generated';

describe('hashQuery', () => {
    it('Should generate the same hash for identical queries', () => {
        const query1 = from('actor').all();
        const query2 = from('actor').all();

        expect(query1.hash).toEqual(query2.hash);
    });

    it('Should generate different hashes for different queries', () => {
        const query1 = from('actor').where({ actor_id: 1 }).all();
        const query2 = from('actor').where({ actor_id: 2 }).all();

        expect(query1.hash).not.toEqual(query2.hash);
    });
});
