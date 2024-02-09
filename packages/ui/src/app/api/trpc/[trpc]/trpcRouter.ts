import { z } from 'zod';
import { procedure, router } from '../../../../trpc/trpc';
import { initQueryEngine, queryEngine } from '../../queryEngine';
import { Project, ts } from 'ts-morph';
import fs from 'fs';
import { executeProgram } from './executeProgram';
import { collectFirst } from '@synthql/backend';

export const appRouter = router({
    connect: procedure
        .input(
            z.object({
                url: z.string(),
                schema: z.string()
            }),
        )
        .mutation(async ({ input }) => {
            const queryEngine = await initQueryEngine(input.url, input.schema);
            const introspection = (await queryEngine.introspect())
            return {
                introspection
            };
        }),

    executeProgram: procedure
        .input(z.object({
            program: z.string()
        }))
        .mutation(async ({ input }) => {

            const query = executeProgram(input.program);

            if (!queryEngine) {
                return {
                    query,
                    result: "Error: queryEngine not initialized"
                }
            }
            try {
                return {
                    query,
                    result: await collectFirst(queryEngine.execute(query))
                }
            }
            catch (e) {
                return {
                    query,
                    result: { error: String(e) }
                }
            }
        })
});

// export type definition of API
export type AppRouter = typeof appRouter;