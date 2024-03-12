import { isRefOp } from '@synthql/queries';
import { AnyQuery } from '../types';
import { iterateQuery } from './iterateQuery';
import { isAnyIndex } from '../util/path/isAnyIndex';

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
            depth: insertionPath.filter((p) => !isAnyIndex(p)).length * 2,
            table,
            join,
        });
    }
    return lines
        .map(
            ({ depth, table, join }) =>
                `${'  '.repeat(depth)}${table}: ${join}`,
        )
        .join('\n');
}
