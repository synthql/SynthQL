import { fc } from '@fast-check/vitest';

export function arbitraryTableName(tableName: string): fc.Arbitrary<string> {
    return fc.constant(tableName);
}
