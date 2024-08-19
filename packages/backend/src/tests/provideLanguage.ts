import { QueryProvider } from '../QueryProvider';
import { assertArray } from '../util/asserts/assertArray';
import { assertPresent } from '../util/asserts/assertPresent';
import { DB } from './generated';
import { ColumnDataTypes } from './getColumnDataTypes';

type Language = ColumnDataTypes<DB['language']['columns']>;

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
): QueryProvider<DB, 'language'> {
    return {
        table: 'language',
        execute: async ({ language_id: languageIds }): Promise<Language[]> => {
            assertPresent(languageIds);

            assertArray(languageIds);

            if (languageIds.length === 0) {
                return languages;
            }

            return languages.filter((l) => languageIds.includes(l.language_id));
        },
    };
}
