import { QueryResult } from "@synthql/queries";
import { ExecResultNode, ExecResultTree, ResultRow } from "./types";
import { applyCardinality } from "../QueryEngine/applyCardinality";
import { AnyDb, AnyQuery, AnyTable } from "../types";
import { deleteAt } from "../util/deleteAt";
import { updateAt } from "../util/updateAt";

export function composeExecutionResults(results: ExecResultTree): QueryResult<AnyDb, AnyTable> {
    return composeExecutionResultsRecursively(results.root, results.root.result) as QueryResult<AnyDb, AnyTable>;
}

function composeExecutionResultsRecursively(node: ExecResultNode, resultRows: ResultRow[]) {
    const path = node.path;


    const applySelection = createApplySelection(node.inputQuery, path);
    const applyIncludes = createApplyIncludes(node.inputQuery, path);

    for (const row of resultRows) {
        applySelection(row);
        applyIncludes(row);
    }
}

/**
 * Returns a function that given a row, applies the query's `select` to the row.
 */
function createApplySelection(query: AnyQuery, path: Array<string | number>) {
    const selectedColumns = new Set(Object.keys(query.select));

    for (const [includeKey, include] of Object.entries(query.include ?? {})) {
        if (Object.keys(include.select).length > 0) {
            selectedColumns.add(includeKey)
        }
    }

    return (row: ResultRow) => {
        for (const key of Object.keys(row)) {
            if (!selectedColumns.has(key)) {
                deleteAt(row, [...path, key])
            }
        }
    }
}

/**
 * Returns a function that given a row, applies the query's `select` to the row.
 */
function createApplyIncludes(query: AnyQuery, path: Array<string | number>) {
    return (row: ResultRow) => {
        for (const [includeKey, subQuery] of Object.entries(query.include ?? {})) {
            const includePath = [...path, includeKey]
            const subQueryResults = findSubQueryResults(subQuery.from, ...);

            updateAt(row, includePath, () => {
                return applyCardinality(subQueryResults, subQuery.cardinality ?? 'many')
            })
        }
    }
}

/**
 * Example: finding movies with actors and rotten tomatoes ratings
 * 
 * Here's the query tree, with the path to each subquery:
 * 
 * ```
 * - film                                      `[]`
 *     - rotten_tomatoes_rating                `[anyIndex, 'ratings']`
 *     - film_actor                            `[anyIndex, 'actors']`
 *         - actor                             `[anyIndex, 'actors', anyIndex, 'actor']`
 *            - rotten_tomatoes_actor_rating   `[anyIndex, 'actors', anyIndex, 'actor', 'rating']`
 * ```
 * 
 * Query:
 * ```ts
 * const ratings = from('rotten_tomatoes_rating')
 *   .column('rating')
 *   .where({ film_title: col('film.title'), film_year: col('film.year') })
 *   .one()
 * 
 * const actorRating = from('rotten_tomatoes_actor_rating')
 *   .column('rating')
 *   .where({ actor_first_name: col('actor.first_name'), actor_last_name: col('actor.last_name') })
 *   .maybe()
 * 
 * const actor = from('actor')
 *   .column('first_name')
 *   .where({ id: col('film_actor.actor_id') })
 *   .include({ rating:actorRating })
 *   .many()
 * 
 * const actors = from('film_actor')
 *  .column()
 *  .where({ film_id: col('film.id') })
 *  .include({ actor })
 *  .many()
 * 
 * return from('film')
 *  .column('id','title')
 *  .include({ ratings, language, actors })
 *  .where({ id: { in: [1,2] } })
 *  .many()
 * ```
 * 
 * Assume the following queries are assigned to the following executors:
 * 1. `film+film_actor+actor` -> `PgExecutor`
 * 2. `rotten_tomatoes_rating` -> `RottenTomatoesFilmExecutor`
 * 3. `rotted_tomatoes_actor_rating` -> `RottenTomatoesActorExecutor`
 * 
 * The film+language subquery will return something like:
 * ```
 * {
 *   path: [],
 *   rows: [{ id: 1, title: 'The Shawshank Redemption', year: 1994, actors: [{ actor: { first_name: 'Tim', last_name: 'Robbins' }}] },
 *         { id: 2, title: 'The Godfather', year: 1972, actors: [{ actor: { first_name: 'Marlon', last_name: 'Brando' }}] }]
 * }
 * ```
 * 
 * The ratings subquery will return something like:
 * ```
 * {
 *   path: [symbol('everyIndex'),'ratings'],
 *   rows: [{ rating: 9.3, film_title: 'The Shawshank Redemption', film_year: 1994 },
 *          { rating: 9.2, film_title: 'The Godfather', film_year: 1972 }]
 * }
 * ```
 * 
 * 
 */
function tmp() {

}