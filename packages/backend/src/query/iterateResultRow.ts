import { AnyQuery } from '@synthql/queries';
import { Path, ResultRow } from '../execution/types';
import { ColumnRef } from '../refs/ColumnRef';
import { printPath } from '../util/path/printPath';
import { printObj } from '../util/printObj';
import { getIn } from '../util/tree/getIn';
import { columns } from './columns';
import { iterateQuery } from './iterateQuery';

export function* iterateResultRows(
    rows: ResultRow[],
    query: AnyQuery,
    defaultSchema: string,
): Generator<{
    column: ColumnRef;
    values: unknown[];
}> {
    for (const { query: subQuery, insertionPath } of iterateQuery(query)) {
        const cols = columns(subQuery, defaultSchema);
        for (const col of cols) {
            const path = [...insertionPath, col.column];

            try {
                yield {
                    column: col,
                    values: getIn(rows, path),
                };
            } catch (err) {
                throw new IterateResultRowsError({ rows, path, err });
            }
        }
    }
}

interface IterateResultRowsErrorProps {
    rows: ResultRow[];
    path: Path;
    err: any;
}

class IterateResultRowsError extends Error {
    constructor(props: IterateResultRowsErrorProps) {
        super(composeMessage(props));

        Error.captureStackTrace(this, IterateResultRowsError);

        this.name = 'IterateResultRowsError';
    }
}

function composeMessage(props: IterateResultRowsErrorProps): string {
    const lines: string[] = [
        'Failed to iterate result rows',
        props.err instanceof Error
            ? [props.err.message, props.err.stack].join('\n')
            : String(props.err),
        '',
        'Rows:',
        printObj(props.rows),
        '',
        'Path:',
        printPath(props.path),
        '',
    ];

    return lines.join('\n');
}
