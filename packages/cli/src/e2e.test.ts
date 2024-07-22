import { describe, expect, test } from 'vitest';
import * as prettier from 'prettier';
import fs from 'fs';
import path from 'path';
import { configFileSchema } from './validators/schemas';

describe('e2e', () => {
    test('Write schema file', async () => {
        const prettierOptions = await prettier.resolveConfig(
            '../../.prettier.config.js',
        );

        expect(prettierOptions).not.toBe(null);

        // Generate in `cli` package
        const cliOutDir = '../cli/src/tests';

        if (!fs.existsSync(cliOutDir)) {
            fs.mkdirSync(cliOutDir, { recursive: true });
        }

        fs.writeFileSync(
            path.join(cliOutDir, 'synthql.dev.config.json'),
            await prettier.format(JSON.stringify(configFileSchema, null, 2), {
                parser: 'json',
                ...prettierOptions,
            }),
        );

        // Generate in `docs` package
        const docsOutDir = '../docs/static/schemas';

        if (!fs.existsSync(docsOutDir)) {
            fs.mkdirSync(docsOutDir, { recursive: true });
        }

        fs.writeFileSync(
            path.join(docsOutDir, 'synthql.config.json'),
            await prettier.format(JSON.stringify(configFileSchema, null, 2), {
                parser: 'json',
                ...prettierOptions,
            }),
        );

        // TODO: add test that checks that overrides are being applied successfully!
    }, 100_000);
});
