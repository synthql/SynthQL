import { fc } from '@fast-check/vitest';
import { Schema, Select, getTableSelectableColumns } from '@synthql/queries';
import { AnyDb } from '../../../types';

export function arbitrarySelect<DB>({
    schema,
    tableName,
}: {
    schema: Schema<DB>;
    tableName: string;
}): fc.Arbitrary<Select<AnyDb, string>> {
    return fc
        .constantFrom(getTableSelectableColumns<DB>(schema, tableName))
        .chain((keys) =>
            fc.dictionary(
                fc.constantFrom(
                    ...getTableSelectableColumns(schema, tableName),
                ),
                fc.constant(true),
                {
                    depthIdentifier: '0',
                    minKeys: 1,
                    maxKeys: keys.length,
                },
            ),
        );
}
