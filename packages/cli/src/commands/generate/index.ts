import { generate } from '@synthql/introspect';
import path from 'path';

interface GenerateSchemaOptions {
    connectionString: string;
    out: string;
    defaultSchema: string;
    schemas: string[];
}

export const generateSchema = async ({
    connectionString,
    out,
    defaultSchema,
    schemas = [],
}: GenerateSchemaOptions) => {
    const result = await generate({
        defaultSchema,
        connectionString,
        includeSchemas: schemas,
        outDir: path.resolve(path.join(process.cwd(), out)),
    });

    return result;
};
