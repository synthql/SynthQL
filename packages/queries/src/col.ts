import { ColumnReference } from './types/ColumnReference';
import { RefOp } from './types/RefOp';

export function col<DB>(ref: ColumnReference<DB>): RefOp<DB> {
    const parts = ref.split('.');
    if (parts.length === 2) {
        return {
            $ref: {
                table: parts[0] as any,
                column: parts[1] as any,
            },
        };
    }
    if (parts.length === 3) {
        return {
            $ref: {
                table: `${parts[0]}.${parts[1]}` as any,
                column: parts[2] as any,
            },
        };
    }
    throw new Error(`Invalid column reference: ${ref}`);
}
