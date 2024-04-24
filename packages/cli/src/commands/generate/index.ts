import { QueryEngine } from '@synthql/backend';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

interface GenerateSchemaOptions {
    connectionString: string;
    out: string;
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

    try {
        if (!fs.existsSync(out)) {
            fs.mkdirSync(out, { recursive: true });
        }
    } catch (err) {
        return err;
    }

    const result = await queryEngine.generateSchema({
        out: path.join(out, `db.ts`),
        defaultSchema,
        schemas,
    });

    return result;
};
