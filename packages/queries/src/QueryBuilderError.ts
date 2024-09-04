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

    static createNestedQueryInvalidRefOpWhereClauseError<DB>({
        query,
        nestedQuery,
        refOpWhereClause,
    }: {
        query: Query<DB>;
        nestedQuery: Query<DB>;
        refOpWhereClause: RefOp<any>;
    }): QueryBuilderError {
        const type = 'NestedQueryInvalidRefOpWhereClauseError';

        const lines = [
            'Nested query invalid RefOp where clause error!',
            '',
            'The RefOp where clause:',
            '',
            JSON.stringify(refOpWhereClause, null, 2),
            '',
            'in the nested SynthQL query:',
            '',
            JSON.stringify(nestedQuery, null, 2),
            '',
            'in the parent SynthQL query:',
            '',
            JSON.stringify(query, null, 2),
            '',
            'is not valid for that parent query!',
            '',
            'The parent query table name is:',
            '',
            query.from,
            '',
            'but the passed RefOp where clause',
            'is pointing at this table:',
            '',
            refOpWhereClause.$ref.table,
            '',
            'Your RefOp where clause should point',
            `to a valid column in "${query.from}",`,
            'to connect (i.e. `JOIN`) the nested query to its parent query',
            '',
        ];

        return new QueryBuilderError(type, lines.join('\n'));
    }
}
