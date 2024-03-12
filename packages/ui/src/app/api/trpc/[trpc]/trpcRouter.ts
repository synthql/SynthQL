import { z } from 'zod';
import { procedure, router } from '../../../../trpc/trpc';
import { initQueryEngine, queryEngine } from '../../queryEngine';
import { Project, ts } from 'ts-morph';
import fs from 'fs';
import { executeProgram } from './executeProgram';
import { collectFirst } from '@synthql/backend';
import path from 'path';
import { homedir } from 'os';

export const appRouter = router({
    connect: procedure
        .input(
            z.object({
                url: z.string(),
                schema: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            const queryEngine = await initQueryEngine(input.url, input.schema);
            const introspection = await queryEngine.introspect();
            return {
                introspection,
            };
        }),

    executeProgram: procedure
        .input(
            z.object({
                program: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            const query = executeProgram(input.program);

            let sql = '';
            try {
                sql = queryEngine?.compile(query).sql ?? '';
            } catch (e) {
                console.error(e);
            }

            if (!queryEngine) {
                return {
                    query,
                    result: 'Error: queryEngine not initialized',
                    sql,
                };
            }
            try {
                return {
                    query,
                    result: await collectFirst(queryEngine.execute(query)),
                    sql,
                };
            } catch (e) {
                return {
                    query,
                    result: { error: String(e) },
                    sql,
                };
            }
        }),

    readFile: procedure
        .input(
            z.object({
                fileName: z.string(),
            }),
        )
        .query(async ({ input }) => {
            const publicFolder = path.join(homedir(), 'synthql');
            if (!fs.existsSync(publicFolder)) {
                // create the folder if it doesn't exist
                fs.mkdirSync(publicFolder);
            }

            const fileName = path.join(publicFolder, input.fileName);

            if (!fs.existsSync(fileName)) {
                return `// file not found at ${path.resolve(fileName)}`;
            }
            return fs.readFileSync(fileName).toString();
        }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
