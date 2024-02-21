import { Kysely, PostgresDialect, SelectQueryBuilder } from "kysely";
import { Pool } from "pg";
import { AnyQuery } from "../../../types";
import { QueryExecutor } from "../../types";
import { QueryProviderExecutor } from "../QueryProviderExecutor";
import { composeQuery } from "./composeQuery";
import { hydrate } from "./hydrate";

type KyselyQueryResult = {
    [key: string]: any;
}

export class KyselyExecutor implements QueryExecutor<KyselyQueryResult> {

    private kysely: Kysely<any>;

    constructor(pool: Pool, private defaultSchema: string, private qpe: QueryProviderExecutor) {
        this.kysely = new Kysely({
            dialect: new PostgresDialect({
                pool
            }),
        });
    }

    async execute(query: AnyQuery): Promise<Array<KyselyQueryResult>> {
        const { kQuery, rootQuery } = composeQuery({
            db: this.kysely,
            defaultSchema: this.defaultSchema,
            query
        });
        const rawResults = await kQuery.execute();
        return hydrate(rawResults, rootQuery) as Array<KyselyQueryResult>;
    }

    canExecute(query: AnyQuery): { query: AnyQuery, remaining: AnyQuery[] } | undefined {
        if (this.qpe.canExecute(query)) {
            return undefined
        }
        const isSupported = (q: AnyQuery) => {
            const isProviderQuery = this.qpe.canExecute(q);
            const isLazyQuery = q.lazy;
            return !isProviderQuery && !isLazyQuery;
        }
        return collectSupportedQueries(query, isSupported);
    }
}

function collectSupportedQueries(query: AnyQuery, isSupported: (q: AnyQuery) => boolean): { query: AnyQuery, remaining: AnyQuery[] } {

    const remaining: AnyQuery[] = []

    const include: AnyQuery['include'] = {}
    for (const [key, subQuery] of Object.entries(query.include ?? {})) {
        if (isSupported(subQuery)) {
            include[key] = collectSupportedQueries(subQuery, isSupported).query
        }
        else {
            remaining.push(subQuery)
        }
    }

    return {
        query: {
            ...query,
            include
        }, remaining
    }
}

