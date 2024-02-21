import { describe, test } from "vitest";
import { queryEngine } from "../tests/queryEngine";
import { generateSchema } from "./generateSchema";
import * as prettier from "prettier"
import { writeFileSync } from "fs";

describe('generateSchema', () => {
    test('generateSchema', async () => {
        const output = await generateSchema(queryEngine as any, { schemas: ['public'] })
        const options = await prettier.resolveConfig('./.prettierrc.js');
        const formatted = await prettier.format(output, { parser: 'typescript', ...options })
        writeFileSync('src/tests/generated.schema.ts', formatted)

    })
})