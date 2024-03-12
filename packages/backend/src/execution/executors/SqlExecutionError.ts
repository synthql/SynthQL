import { format } from 'sql-formatter';
import { AnyQuery } from '../../types';
import { DatabaseError } from 'pg';

interface SqlExecutionErrorProps {
    query: AnyQuery;
    sql: string;
    params: readonly any[];
    err: any;
}

export class SqlExecutionError extends Error {
    constructor(props: SqlExecutionErrorProps) {
        super(composeMessage(props));

        Error.captureStackTrace(this, SqlExecutionError);

        this.name = 'SqlExecutionError';
    }
}

function printError(err: any, sql: string): string {
    if (err instanceof DatabaseError) {
        return [err.message, err.stack].join('\n');
    } else if (err instanceof Error) {
        return [err.message, err.stack].join('\n');
    }
    return String(err);
}

function composeMessage(props: SqlExecutionErrorProps): string {
    const lines: string[] = [
        '# Error executing query',
        '',
        printError(props.err, props.sql),
        '',
        'This error was caused by the following SQL query:',
        tryFormatSql(props.sql),
        '',
        'With the following parameters:',
        JSON.stringify(props.params, null, 2),
        '',
        'And which was composed from the following synthql query:',
        JSON.stringify(props.query, null, 2),
    ];

    return lines.join('\n');
}

function tryFormatSql(sql: string): string {
    try {
        return format(sql, { language: 'postgresql' });
    } catch (err) {
        return sql;
    }
}
