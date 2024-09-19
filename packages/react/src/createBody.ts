import {
    AnyQuery,
    isQueryParameter,
    iterateRecursively,
    QueryRequest,
} from '@synthql/queries';

export function createBody(query: AnyQuery): QueryRequest {
    const params: Record<string, unknown> = {};

    iterateRecursively(query, (x, path) => {
        if (isQueryParameter(x)) {
            if (x.value === undefined) {
                throw new Error(
                    [
                        'Missing value error!',
                        '',
                        'No value passed for the parameter:',
                        '',
                        JSON.stringify(x.id, null, 2),
                        '',
                    ].join('\n'),
                );
            }

            params[x.id] = x.value;
        }
    });

    if (query.name || Object.keys(params).length > 0) {
        if (!query.hash) {
            throw new Error(
                [
                    'Missing hash error!',
                    '',
                    'The query:',
                    '',
                    JSON.stringify(query, null, 2),
                    '',
                    'is missing its `hash` property',
                    '',
                ].join('\n'),
            );
        }

        return {
            type: 'RegisteredQuery',
            queryId: query.hash,
            params,
        };
    } else {
        return {
            type: 'RegularQuery',
            query,
        };
    }
}
