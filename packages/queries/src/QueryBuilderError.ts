import { AnyQuery } from './types/AnyQuery';

export class QueryBuilderError extends Error {
    constructor(
        public type: string,
        public message: string,
    ) {
        super(message);
        this.type = type;
        Error.captureStackTrace(this, QueryBuilderError);
    }

    static createNestedQueryMissingRefOpWhereClauseError({
        query,
        nestedQuery,
    }: {
        query: { from: string };
        nestedQuery: { from: string };
    }): QueryBuilderError {
        const type = 'NestedQueryMissingRefOpWhereClauseError';

        const lines = [
            `The table "${query.from}" is including table "${nestedQuery.from}",`,
            `but "${nestedQuery.from}" is missing a join predicate!`,
            '',
            `Hint: are you missing \`.where({some_id: "${query.from}.some_id"})\``,
            `on the "${nestedQuery.from}" query?`,
            ``,
        ];

        return new QueryBuilderError(type, lines.join('\n'));
    }
}
