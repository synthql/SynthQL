import { Query } from './types/types';
import { RefOp } from './types/RefOp';

export class QueryBuilderError extends Error {
    constructor(
        // TODO: extend the class to include the query. Blocker from doing
        // this now, is that `AnyQuery`, still lives in the backend package
        // public query: AnyQuery,
        public type: string,
        public message: string,
    ) {
        super(message);
        Error.captureStackTrace(this, QueryBuilderError);
    }

    static createNestedQueryMissingRefOpWhereClauseError<DB>({
        query,
        nestedQuery,
    }: {
        query: Query<DB>;
        nestedQuery: Query<DB>;
    }): QueryBuilderError {
        const type = 'NestedQueryMissingRefOpWhereClauseError';

        const lines = [
            `The table "${query.from}" is including table "${nestedQuery.from}",`,
            `but "${nestedQuery.from}" is missing a join predicate!`,
            '',
            `Hint: are you missing \`.where({some_id: "${query.from}.some_id"})\``,
            `on the "${nestedQuery.from}" query?`,
        ];

        return new QueryBuilderError(type, lines.join('\n'));
    }
}
