import { QueryEngine } from '@synthql/backend';
import { Pool } from 'pg';

interface GenerateSchemaOptions {
    connectionString: string;
    outputDir?: string;
    defaultSchema?: string;
    schemas?: string[];
}

export const generate = async ({
    connectionString,
    outputDir,
    defaultSchema,
    schemas,
}: GenerateSchemaOptions) => {
    const pool = new Pool({
        connectionString,
    });

    const queryEngine = new QueryEngine({
        pool,
        schema: defaultSchema,
    });

    const result = await queryEngine.generateSchema({
        out: outputDir,
        defaultSchema,
        schemas: schemas ?? [],
    });

    return result;
};
