import path from 'path';
import { generate } from '@synthql/introspect';
import { SchemaDefOverrides } from '@synthql/queries';

interface GenerateSchemaOptions {
    connectionString: string;
    out: string;
    defaultSchema: string;
    schemas: string[];
    tables?: string[];
    schemaDefOverrides?: SchemaDefOverrides;
}

export const generateSchema = async ({
    connectionString,
    out,
    defaultSchema,
    schemas = [],
    tables = [],
    schemaDefOverrides,
}: GenerateSchemaOptions) => {
    return await generate({
        defaultSchema,
        connectionString,
        includeSchemas: schemas,
        includeTables: tables,
        schemaDefOverrides: schemaDefOverrides,
        outDir: path.resolve(path.join(process.cwd(), out)),
    });
};
