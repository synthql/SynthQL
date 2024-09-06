import { AnyQuery, isRefOp } from '@synthql/queries';
import { iterateQuery } from './iterateQuery';

export function describeQuery(q: AnyQuery): string {
    const lines: { depth: number; table: string; join: string }[] = [];
    for (const { query, insertionPath } of iterateQuery(q)) {
        const table = query.from.replace('public.', '');

        const join = Object.entries(query.where)
            .flatMap(([k, v]) => {
                if (isRefOp(v)) {
                    return [
                        `${table}.${k} = ${v.$ref.table.replace('public.', '')}.${v.$ref.column}`,
                    ];
                }
                return [];
            })
            .join(' and ');

        lines.push({
            depth: insertionPath.length * 2,
            table,
            join,
        });
    }
    return lines
        .map(({ depth, table, join }) =>
            `${'  '.repeat(depth)}${table}: ${join}`.trimEnd(),
        )
        .join('\n');
}
