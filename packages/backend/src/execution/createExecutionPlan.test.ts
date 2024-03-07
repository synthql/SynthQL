import { describe, expect, test } from "vitest";
import { provideFilm } from "../tests/provideFilm";
import { provideLanguage } from "../tests/provideLanguage";
import { film } from "../tests/queries.v2";
import { pool } from "../tests/queryEngine";
import { createExecutionPlan } from "./createExecutionPlan";
import { PgExecutor } from "./executors/PgExecutor";
import { QueryProviderExecutor } from "./executors/QueryProviderExecutor";
import { ExecPlanTree, QueryExecutor } from "./types";
import { interateTree } from "../util/tree/iterateTree";
import { Table } from "@synthql/queries"
import { DB } from "../tests/generated.schema";
import { height } from "../util/tree/height";

function assertExecutorAssignment(plan: ExecPlanTree, table: Table<DB>, executor: QueryExecutor) {
    let found = false;
    for (const node of interateTree(plan.root)) {
        if (node.inputQuery.from === table) {
            found = true;
            describe(`Query from ${node.inputQuery.from} must be assigned to ${executor.constructor.name}`, () => {
                test('Executor matches', () => {
                    expect(node.executor).toBe(executor);
                })
                test('from matches', () => {
                    expect(node.inputQuery.from).toEqual(node.query.from)
                })
            })
        }
    }
    if (!found) {
        throw new Error(`Table ${table} not found in plan`)
    }
}

describe('createExecutionPlan', () => {
    describe('find film', () => {
        const q = film().where({ film_id: 1 }).maybe()

        const qpe = new QueryProviderExecutor([provideLanguage(), provideFilm()]);
        const pgExecutor = new PgExecutor(pool, 'public', qpe);
        const plan = createExecutionPlan(q, {
            defaultSchema: 'public',
            executors: [pgExecutor, qpe]
        })

        assertExecutorAssignment(plan, 'public.film', qpe);
        assertExecutorAssignment(plan, 'public.language', qpe);
        assertExecutorAssignment(plan, 'public.actor', pgExecutor);
        assertExecutorAssignment(plan, 'public.film_actor', pgExecutor);
    })

    describe('find film', () => {
        const q = film().where({ film_id: 1 }).maybe()

        const qpe = new QueryProviderExecutor([]);
        const pgExecutor = new PgExecutor(pool, 'public', qpe);
        const plan = createExecutionPlan(q, {
            defaultSchema: 'public',
            executors: [pgExecutor, qpe]
        })

        expect(height(plan.root)).toEqual(1);
        assertExecutorAssignment(plan, 'public.film', pgExecutor);
    })


})