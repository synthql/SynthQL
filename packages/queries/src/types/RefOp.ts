import { Static, Type as t } from '@sinclair/typebox';

export const RefOpSchema = t.Object({
    $ref: t.Object({
        table: t.String(),
        column: t.String(),
    }),
});

export type RefOp<DB> = Static<typeof RefOpSchema>;
