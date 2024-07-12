import { generate } from '@synthql/introspect';
import path from 'path';

interface GenerateSchemaOptions {
    connectionString: string;
    out: string;
    defaultSchema: string;
    schemas: string[];
    tables?: string[];
}

export const generateSchema = async ({
    connectionString,
    out,
    defaultSchema,
    schemas = [],
    tables = [],
}: GenerateSchemaOptions) => {
    const result = await generate({
        defaultSchema,
        connectionString,
        includeSchemas: schemas,
        includeTables: tables,
        outDir: path.resolve(path.join(process.cwd(), out)),
    });

    return result;
};
