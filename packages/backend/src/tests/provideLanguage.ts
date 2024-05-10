import { QueryProvider } from '../QueryProvider';
import { assertArray } from '../util/asserts/assertArray';
import { assertHasKey } from '../util/asserts/assertHasKey';
import { DB } from './generated';
import { TableTypes } from './getTableTypes';

type L = DB['language']['columns'];

type Language = TableTypes<L>;

const defaultLanguages: Language[] = [
    {
        language_id: 1,
        name: 'English',
        last_update: new Date().toISOString(),
    },
    {
        language_id: 2,
        name: 'French',
        last_update: new Date().toISOString(),
    },
];

export function provideLanguage(
    languages: Language[] = defaultLanguages,
): QueryProvider {
    return {
        table: 'language',
        execute: async (q): Promise<Language[]> => {
            assertHasKey(q.where, 'language_id');
            const language_id = q.where.language_id;

            if (typeof language_id === 'number') {
                return languages.filter((l) => l.language_id === language_id);
            }

            assertHasKey(language_id, 'in');
            const ids = language_id.in;
            assertArray(ids);

            return languages.filter((l) => ids.includes(l.language_id));
        },
    };
}
