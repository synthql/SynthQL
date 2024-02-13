import { describe, test } from "vitest";
import { queryEngine } from "../tests/queryEngine";
import { generateSchema } from "./generateSchema";

describe('generateSchema', () => {
    test('generateSchema', async () => {
        await generateSchema(queryEngine as any, { schemas: ['public'], out: './src/tests/generated.schema.ts' })


    })
})