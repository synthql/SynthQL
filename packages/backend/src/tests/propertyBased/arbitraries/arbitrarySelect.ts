import { fc } from '@fast-check/vitest';
import { Query, Schema } from '@synthql/queries';
import { getTableSelectableColumns } from '../getTableSelectableColumns';

export function arbitrarySelect<DB>({
    schema,
    tableName,
}: {
    schema: Schema<DB>;
    tableName: string;
}): fc.Arbitrary<Query['select']> {
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
