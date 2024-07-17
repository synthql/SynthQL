import path from 'path';
import { generate } from '@synthql/introspect';
import { isValidSchemaDefOverrides } from '../../helpers/isValidSchemaDefOverrides';

interface GenerateSchemaOptions {
    connectionString: string;
    out: string;
    defaultSchema: string;
    schemas: string[];
    tables?: string[];
    schemaDefOverrides?: unknown;
}

export const generateSchema = async ({
    connectionString,
    out,
    defaultSchema,
    schemas = [],
    tables = [],
    schemaDefOverrides,
}: GenerateSchemaOptions) => {
    if (!isValidSchemaDefOverrides(schemaDefOverrides)) {
        const lines = [
            'Invalid shape of schema def overrides:',
            '',
            `${JSON.stringify(schemaDefOverrides, null, 2)}`,
            '',
            'Please check your config file and make sure',
            'it has the correct shape!',
        ];

        throw Error(lines.join('\n'));
    }

    return await generate({
        defaultSchema,
        connectionString,
        includeSchemas: schemas,
        includeTables: tables,
        schemaDefOverrides: schemaDefOverrides,
        outDir: path.resolve(path.join(process.cwd(), out)),
    });
};
