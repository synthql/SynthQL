import { Column, Table, Where } from '@synthql/queries';
import { QueryProviderInput } from '../types/QueryProviderInput';

type TColumn<DB, TTable extends Table<DB>> = Column<DB, TTable>;

type WhereEqualsValue = any;

interface WhereEqualsAnyValueOfInArray {
    in: Array<any>;
}

interface WhereEqualsAnyValueOfEqualsAnyArray {
    '= any': Array<any>;
}

export function convertWhereToQueryProviderInput<DB, TTable extends Table<DB>>(
    table: TTable,
    where: Where<DB, TTable>,
): QueryProviderInput<DB, TTable> {
    const qpi: Record<string, any> = {};

    for (const [key, value] of Object.entries(where)) {
        if (isOfTypeWhereEqualsValue(value)) {
            qpi[key] = [value];
        } else if (isOfTypeWhereEqualsAnyValueInArray(value)) {
            qpi[key] = [...value.in];
        } else if (isOfTypeWhereEqualsValueofEqualsAny(value)) {
            qpi[key] = [...value['= any']];
        } else {
            throw new Error(`
                Invalid query passed to "${table}" QueryProvider!

                You are trying to pass the following 'where' clause to the "${table}" QueryProvider:

                    ${JSON.stringify(where)}

                This 'where' clause is not supported by QueryProvider. 
                    We currently only support clauses of the form:

                    {column: value}
                    {column: {in: [value1, value2, ...]}}
                    {column: {'= any': [value1, value2, ...]}}
            `);
        }
    }

    return qpi;
}

function isOfTypeTColumn<
    DB,
    TTable extends Table<DB>,
    TColumn extends Column<DB, TTable>,
>(key: unknown): key is TColumn {
    return key as TColumn satisfies TColumn;
}

function isOfTypeWhereEqualsValue(value: unknown): value is WhereEqualsValue {
    return typeof (value as WhereEqualsValue) !== 'object';
}

function isOfTypeWhereEqualsAnyValueInArray(
    value: unknown,
): value is WhereEqualsAnyValueOfInArray {
    return Array.isArray((value as WhereEqualsAnyValueOfInArray).in);
}

function isOfTypeWhereEqualsValueofEqualsAny(
    value: unknown,
): value is WhereEqualsAnyValueOfEqualsAnyArray {
    return Array.isArray(
        (value as WhereEqualsAnyValueOfEqualsAnyArray)['= any'],
    );
}
