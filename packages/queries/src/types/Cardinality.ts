import { Static, Type as t } from '@sinclair/typebox';

export const CardinalitySchema = t.Union([
    t.Literal('one'),
    t.Literal('many'),
    t.Literal('maybe'),
]);

/**
 * The cardinality of a query.
 */
export type Cardinality = Static<typeof CardinalitySchema>;
