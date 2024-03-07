import { QueryProvider } from "../QueryProvider";
import { DB } from "./generated.schema";

export type Language = DB['public.language'];

const defaultLanguages = [
    {
        language_id: 1,
        name: 'English',
        last_update: new Date(),
    },
    {
        language_id: 2,
        name: 'French',
        last_update: new Date(),
    },
]

export function provideLanguage(languages: Language[] = defaultLanguages): QueryProvider {
    return {
        table: 'public.language',
        execute: async (q): Promise<Language[]> => {
            const langIds = q.where.language_id.in;
            return defaultLanguages.filter((l) => langIds.includes(l.language_id));
        },
    }
};
