import { QueryEngine } from '@synthql/backend';
import { Pool } from 'pg';

interface GenerateSchemaOptions {
    connectionString: string;
    out?: string;
    defaultSchema?: string;
    schemas?: string[];
}

export const generate = async ({
    connectionString,
    out,
    defaultSchema,
    schemas = [],
}: GenerateSchemaOptions) => {
    const pool = new Pool({
        connectionString,
    });

    const queryEngine = new QueryEngine({
        pool,
        schema: defaultSchema,
    });

    const result = await queryEngine.generateSchema({
        out,
        defaultSchema,
        schemas,
    });

    return result;
};
