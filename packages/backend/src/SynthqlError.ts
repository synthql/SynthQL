import { format } from 'sql-formatter';
import { DatabaseError } from 'pg';
import { AnyQuery } from './types';

interface SqlExecutionErrorProps {
    query: AnyQuery;
    sql: string;
    params: readonly any[];
}

export class SynthqlError extends Error {
    constructor(
        public err: Error | any,
        public type: string,
        public message: string,
    ) {
        super(message);

        Error.captureStackTrace(this, SynthqlError);
    }

    static createConnectionError({
        error,
        url,
    }: {
        error: any;
        url: string;
    }): SynthqlError {
        const type = 'ConnectionError';

        const lines = [
            'Connection error!',
            '',
            'Failure to establish a connection to your datastore:',
            '',
            url,
            '',
            'Check your connection string, and make sure your data store',
            'is up and can accept new connections',
        ];

        return new SynthqlError(error, type, lines.join('\n'));
    }

    static createSqlExecutionError({
        error,
        props,
    }: {
        error: any;
        props: SqlExecutionErrorProps;
    }): SynthqlError {
        const type = 'SqlExecutionError';

        const message = composeMessage(error, props);

        return new SynthqlError(error, type, message);
    }

    static createResponseStreamingError({
        error,
        query,
    }: {
        error: any;
        query: AnyQuery;
    }): SynthqlError {
        const type = 'ResponseStreamingError';

        const lines = [
            'Response streaming error!',
            '',
            'Failure while streaming back the results for the query:',
            '',
            JSON.stringify(query, null, 2),
            '',
            'Check your query and make sure you have `read` access to all included',
            'tables and columns, and have registered all queries via the QueryEngine',
        ];

        return new SynthqlError(error, type, lines.join('\n'));
    }

    static createJsonParsingError({
        error,
        json,
    }: {
        error: any;
        json: string;
    }): SynthqlError {
        const type = 'JsonParsingError';

        const lines = [
            'JSON parsing error!',
            '',
            'Expected a JSON string but got this instead:',
            '',
            json,
            '',
            'Check your query and make sure your stringifying function is behaving as expected',
        ];

        return new SynthqlError(error, type, lines.join('\n'));
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

function composeMessage(err: any, props: SqlExecutionErrorProps): string {
    const lines: string[] = [
        '# Error executing query',
        '',
        printError(err, props.sql),
        '',
        'This error was caused by the following SQL query:',
        tryFormatSql(props.sql),
        '',
        'With the following parameters:',
        JSON.stringify(props.params, null, 2),
        '',
        'And which was composed from the following SynthQL query:',
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
