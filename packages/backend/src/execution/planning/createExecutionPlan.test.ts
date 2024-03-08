import { describe, expect, test } from "vitest";
import { provideFilm } from "../../tests/provideFilm";
import { provideLanguage } from "../../tests/provideLanguage";
import { film } from "../../tests/queries.v2";
import { pool } from "../../tests/queryEngine";
import { createExecutionPlan } from "./createExecutionPlan";
import { PgExecutor } from "../executors/PgExecutor";
import { QueryProviderExecutor } from "../executors/QueryProviderExecutor";
import { ExecPlanTree, QueryExecutor } from "../types";
import { interateTree } from "../../util/tree/iterateTree";
import { Table } from "@synthql/queries"
import { DB } from "../../tests/generated.schema";
import { height } from "../../util/tree/height";
import { mapTree } from "../../util/tree/mapTree";
import { collectLast } from "../..";
import { describeQuery } from "../../query/describeQuery";

function simplifyPlan(plan: ExecPlanTree) {
    return collectLast(mapTree(plan, async (node) => {
        return {
            executor: node.executor.constructor.name,
            from: node.query.from,
            children: node.children
        }
    }))
}

describe('createExecutionPlan', () => {
    test('find film', async () => {
        const q = film().where({ film_id: 1 }).maybe()

        const qpe = new QueryProviderExecutor([provideLanguage(), provideFilm()]);
        const pgExecutor = new PgExecutor(pool, 'public', qpe);
        const plan = createExecutionPlan(q, {
            defaultSchema: 'public',
            executors: [pgExecutor, qpe]
        })

        const simplified = await simplifyPlan(plan)

        expect(simplified).toEqual(
            {
                "root": {
                    "children": [
                        {
                            "children": [],
                            "executor": "QueryProviderExecutor",
                            "from": "public.language",
                        },
                        {
                            "children": [],
                            "executor": "PgExecutor",
                            "from": "public.film_actor",
                        },
                        {
                            "children": [],
                            "executor": "PgExecutor",
                            "from": "public.actor",
                        },
                    ],
                    "executor": "QueryProviderExecutor",
                    "from": "public.film",
                },
            }
        )

        expect(describeQuery(plan.root.query)).toEqual(`film: `)
    })


    test('find film with only PgExecutor', async () => {
        const q = film().where({ film_id: 1 }).maybe()

        const qpe = new QueryProviderExecutor([]);
        const pgExecutor = new PgExecutor(pool, 'public', qpe);
        const plan = createExecutionPlan(q, {
            defaultSchema: 'public',
            executors: [pgExecutor, qpe]
        })

        const simplified = await simplifyPlan(plan)

        expect(simplified).toEqual(
            {
                "root": {
                    "children": [
                    ],
                    "executor": "PgExecutor",
                    "from": "public.film",
                },
            }
        )


    })

})