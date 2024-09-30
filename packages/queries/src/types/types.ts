import { Static, Type as t, TSchema } from '@sinclair/typebox';
import { CardinalitySchema } from './Cardinality';
import { SelectSchema } from './Select';
import { WhereSchema } from './Where';

export const QuerySchema = t.Recursive((self) =>
    t.Object({
        from: t.String(),
        lazy: t.Optional(t.Boolean()),
        select: SelectSchema,
        include: t.Optional(t.Record(t.String(), self)),
        where: WhereSchema,
        cardinality: t.Optional(CardinalitySchema),
        schema: t.Optional(t.Unknown()),
        limit: t.Optional(t.Number()),
        offset: t.Optional(t.Number()),
        hash: t.Optional(t.String()),
        name: t.Optional(t.String()),
        groupBy: t.Optional(t.Array(t.String())),
    }),
);
export type Query<TQueryResult extends TSchema = any> = Static<
    typeof QuerySchema
> & { schema?: TQueryResult };
