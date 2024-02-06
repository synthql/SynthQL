import {
    ExpressionOrFactory,
    Kysely,
    ReferenceExpression,
    SelectCallback,
    SelectQueryBuilder,
    expressionBuilder,
    sql,
} from 'kysely';
import { augmentQuery } from '../AugmentedQuery/augmentQuery';
import { iterateAugmentedQuery } from '../AugmentedQuery/iterateAugmentedQuery';
import { escapeColumn } from '../escape';
import {
    AnyDb,
    AnyQuery,
    AnyTable,
    AugmentedQuery,
    OpValue
} from '../types';
import { isPresent } from '../util/isPresent';

export function composeQuery({
    defaultSchema,
    db,
    query,
}: {
    defaultSchema: string;
    db: Kysely<any>;
    query: AnyQuery;
}): { kQuery: SelectQueryBuilder<any, any, any>; rootQuery: AugmentedQuery } {
    const rootQuery = augmentQuery(query, { defaultSchema });
    const allQueries = Array.from(iterateAugmentedQuery(rootQuery));
    const subQueries = allQueries.slice(1);

    const { from } = rootQuery;

    let kQuery = db
        .selectFrom(`${from.schema}.${from.name} as ${from.alias}`)
        .select(createSelect(allQueries, db));

    if (subQueries.length > 0) {
        const keys = (rootQuery.query.groupingId ?? ['id'])
            .map(id => `${from.alias}.${id}`)

        kQuery = kQuery.groupBy(keys);
    }

    kQuery = kQuery.where(createWhere(allQueries));

    for (const subQuery of subQueries) {
        if (subQuery.leftJoin) {
            const { joinTable, otherColumn, ownColumn, joinOp } =
                subQuery.leftJoin;

            kQuery = kQuery.leftJoin(
                `${joinTable.schema}.${joinTable.name} as ${joinTable.alias}`,
                (eb) => {
                    if (joinOp === '= any') {
                        return eb.on(
                            sql.ref(
                                `${ownColumn.table.alias}.${ownColumn.column}`,
                            ),
                            '=',
                            eqAny(
                                sql.ref(
                                    `${otherColumn.table.alias}.${otherColumn.column}`,
                                ),
                            ),
                        );
                    }

                    return eb.on(
                        sql.ref(`${ownColumn.table.alias}.${ownColumn.column}`),
                        joinOp,
                        sql.ref(
                            `${otherColumn.table.alias}.${otherColumn.column}`,
                        ),
                    );
                },
            );
        }
    }

    if (query.limit !== undefined) {
        kQuery = kQuery.limit(query.limit);
    }

    return { kQuery, rootQuery };
}

function eqAny(thing: ReferenceExpression<AnyDb, AnyTable>) {
    return expressionBuilder<AnyDb, AnyTable>().fn('any', [thing]);
}

function createSelect(
    queries: AugmentedQuery[],
    db: Kysely<any>,
): SelectCallback<any, any> {
    const fields = queries.flatMap((q) => q.select);
    return (eb) => {
        return fields
            .map((field) => {
                if (field.type === 'column') {
                    return `${field.table.alias}.${field.column} as ${field.id}`;
                }
                if (field.type === 'jsonb_agg') {
                    if (field.columns.length === 0) {
                        return undefined;
                    }

                    const columns = field.columns
                        .map((col) => {
                            return `'${col.column}', ${escapeColumn(
                                col.table.alias,
                            )}.${escapeColumn(col.column)}`;
                        })
                        .join(', ');

                    const buildObject = `case when ${escapeColumn(
                        field.id,
                    )} is null then null else jsonb_build_object(${columns}) end`;

                    return sql`jsonb_agg(distinct(${sql.raw(buildObject)}))`.as(
                        field.id,
                    );
                }
                throw new Error('unreachable');
            })
            .filter(isPresent);
    };
}

function createWhere(
    queries: AugmentedQuery[],
): ExpressionOrFactory<any, any, any> {
    return ({ eb, and }) => {
        const conditions = queries.flatMap((q) => q.where);

        const ops = conditions
            .map((where) => {
                switch (where.type) {
                    case 'binary':
                        const { lhs, rhs, op } = where;
                        return eb(composeOpValue(lhs), op, composeOpValue(rhs));
                    case 'ref':
                        return undefined;
                }
            })
            .filter(isPresent);

        return and(ops);
    };
}

function composeOpValue(op: OpValue) {
    if (op.type === 'column') {
        return `${op.column.table.alias}.${op.column.column}`;
    }
    if (op.type === 'value') {
        return op.value;
    }
}
