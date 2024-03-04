import { describe, test } from "vitest";
import { queryEngine } from "../tests/queryEngine";
import * as prettier from "prettier"
import { writeFileSync } from "fs";

describe('generateSchema', () => {
    test.skip('generateSchema', async () => {
        const output = await queryEngine.generateSchema({ schemas: ['public'] })
        const options = await prettier.resolveConfig('./.prettierrc.js');
        const formatted = await prettier.format(output, { parser: 'typescript', ...options })
        writeFileSync('src/tests/generated.schema.ts', formatted)

    })
})