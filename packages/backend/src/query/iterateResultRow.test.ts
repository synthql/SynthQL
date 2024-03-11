import { describe, expect, test } from "vitest";
import { iterateResultRows } from "./iterateResultRow";
import { city } from "../tests/queries.v2";
import { QueryResult, col } from "@synthql/queries";
import { DB } from "../tests/generated.schema";

describe('iterateResultRow', () => {
    test('iterateResultRow', () => {
        const q = city().where({ city_id: col('public.address.city_id') }).many();

        const queryResult: QueryResult<DB, typeof q> = [
            { city: "Bogota", city_id: 1 },
            { city: "Cali", city_id: 2 },
            { city: "Medellin", city_id: 3 },
        ]

        expect(Array.from(iterateResultRows(queryResult, q, 'public'))).toMatchInlineSnapshot(`
          [
            {
              "column": ColumnRef {
                "column": "city_id",
                "tableRef": TableRef {
                  "schema": "public",
                  "table": "city",
                },
              },
              "values": [
                1,
                2,
                3,
              ],
            },
            {
              "column": ColumnRef {
                "column": "city",
                "tableRef": TableRef {
                  "schema": "public",
                  "table": "city",
                },
              },
              "values": [
                "Bogota",
                "Cali",
                "Medellin",
              ],
            },
          ]
        `)
    })
})