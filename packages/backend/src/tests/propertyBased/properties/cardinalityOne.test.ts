import { test, fc } from '@fast-check/vitest';
import { schema } from '../../generated';
import { expect } from 'vitest';
import { generateQueryArbitrary } from '../arbitraries/cardinality';

const qa = generateQueryArbitrary(schema);

// test.prop([fc.boolean()])('should detect the substring', (query) => {
//     console.log(query);
//     expect(query);
// });

test.prop([qa])('should detect the substring', (query) => {
    console.log(query);
    expect(query).toBe(1);
});
