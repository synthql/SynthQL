/**
 * Returns the keys of TRecord that extend TValue
 *
 * Example:
 * ```ts
 * type Record = {
 *  name: string;
 *  age: number;
 * }
 *
 * FilterByValue<Record, string> // 'name'
 * FilterByValue<Record, number> // 'age'
 */
export type FilterByValue<TRecord, TValue> = {
    [Key in keyof TRecord]: TRecord[Key] extends TValue ? Key : never;
}[keyof TRecord];
