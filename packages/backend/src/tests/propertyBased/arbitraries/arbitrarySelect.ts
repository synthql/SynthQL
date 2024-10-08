import { fc } from '@fast-check/vitest';
import { AnyDB, Schema, Select, Table } from '@synthql/queries';
import { getTableSelectableColumns } from '../getTableSelectableColumns';

export function arbitrarySelect<DB>({
    schema,
    tableName,
}: {
    schema: Schema<DB>;
    tableName: Table<DB>;
}): fc.Arbitrary<Select<AnyDB, string>> {
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
