import { Table, Where } from '@synthql/queries';
import { AnyQuery } from '../../../types';
import { QueryProviderInput } from '../../../types/QueryProviderInput';

/**
 * Takes a `Where` object and converts it into a `QueryProviderInput` object.
 */
export function convertWhereToQueryProviderInput<DB, TTable extends Table<DB>>(
    table: TTable,
    where: Where<DB, TTable>,
): QueryProviderInput<DB, TTable> {
    const qpi: Record<string, any> = {};

    for (const { op, column, value } of iterateQueryOperators({
        from: table,
        where,
    })) {
        // Initialize the array if it doesn't exist
        if (!qpi[column]) {
            qpi[column] = [];
        }
        // Then push the values into the array
        if (op === 'in') {
            qpi[column]?.push(...value);
        }
        // If it's an equals operator, we just push the value
        else if (op === '=') {
            qpi[column]?.push(value);
        }
        // Otherwise, we throw an error for unsupported operators
        else {
            throw createUnsupportedQueryError(table, where);
        }
    }

    return qpi;
}

function createUnsupportedQueryError(table: string, where: AnyQuery['where']) {
    const lines = [
        `Invalid query passed to the "${table}" QueryProvider!`,
        ``,
        `You are trying to pass the following 'where' clause to the "${table}" QueryProvider:`,

        `    ${JSON.stringify(where)}`,
        ``,
        `This 'where' clause is not supported by QueryProvider. We currently only support clauses of the form:`,
        ``,
        ` 1.)   {column: value}`,
        ` 2.)   {column: {in: [value1, value2, ...]}}`,
        ` 3.)   {column: {'= any': [value1, value2, ...]}}`,
    ];

    return new Error(lines.join('\n'));
}

/**
 * Crates an iterator that yields the operators in a query.
 *
 * This lets us iterate over the query operators in a query.
 */
function* iterateQueryOperators(query: AnyQuery['where']): Generator<
    | {
          op: '=';
          column: string;
          value: SqlValue | SqlValue[];
      }
    | { op: 'in'; column: string; value: SqlValue[] }
> {
    for (const [column, value] of Object.entries(query.where)) {
        let someSupported = false;
        if (isSqlValue(value)) {
            yield { op: '=', column, value };
            someSupported = true;
        }
        if (isInOperator(value)) {
            yield { op: 'in', column, value: value.in };
            someSupported = true;
        }
        if (isEqAnyOperator(value)) {
            // This is a special case where we need to convert it to an IN operator
            // They are semantically equivalent
            yield { op: 'in', column, value: value['= any'] };
            someSupported = true;
        }
        if (!someSupported) {
            throw createUnsupportedQueryError(query.from, query.where);
        }
    }
}

type SqlValue = number | boolean | string | Date;

/**
 * Duck-test if the value is a SQL value.
 */
function isSqlValue(value: unknown): value is SqlValue | Array<SqlValue> {
    if (value instanceof Date) {
        return true;
    }
    if (value === null || value === undefined) {
        return true;
    }
    if (
        typeof value === 'number' ||
        typeof value === 'string' ||
        typeof value === 'boolean'
    ) {
        return true;
    }
    if (Array.isArray(value)) {
        return value.every((v) => isSqlValue(v));
    }
    return false;
}

/**
 * Duck-test if the value is an `in` operator.
 */
function isInOperator(value: unknown): value is { in: SqlValue[] } {
    if (typeof value !== 'object' || value === null) {
        return false;
    }
    if ('in' in value) {
        return Array.isArray(value.in);
    }
    return false;
}

/**
 * Duck-test if the value is an `= any` operator.
 */
function isEqAnyOperator(value: unknown): value is { '= any': SqlValue[] } {
    if (typeof value !== 'object' || value === null) {
        return false;
    }
    if ('= any' in value) {
        return Array.isArray(value['= any']);
    }
    return false;
}
