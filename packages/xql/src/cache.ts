import { AnyQuery, Query, QueryResult, Table } from "./types";

export class QueryCache {
    private cache = new Map<string, QueryResult<any, any>>();

    public set<DB, TTable extends Table<DB>>(query: Query<DB, TTable>, result: QueryResult<DB, TTable>) {
        const key = hashKey(query)
        this.cache.set(key, result)
    }

    public get<DB, TTable extends Table<DB>>(query: Query<DB, TTable>): QueryResult<DB, TTable> | undefined {
        const key = hashKey(query)
        return this.cache.get(key) as QueryResult<DB, TTable> | undefined
    }
}

function hashKey(queryKey: AnyQuery): string {
    return JSON.stringify(queryKey, (_, val) =>
        isPlainObject(val)
            ? Object.keys(val)
                .sort()
                .reduce((result, key) => {
                    result[key] = val[key]
                    return result
                }, {} as any)
            : val,
    )
}

export function isPlainObject(o: any): o is Object {
    if (!hasObjectPrototype(o)) {
        return false
    }

    // If has no constructor
    const ctor = o.constructor
    if (typeof ctor === 'undefined') {
        return true
    }

    // If has modified prototype
    const prot = ctor.prototype
    if (!hasObjectPrototype(prot)) {
        return false
    }

    // If constructor does not have an Object-specific method
    if (!prot.hasOwnProperty('isPrototypeOf')) {
        return false
    }

    // Most likely a plain Object
    return true
}

function hasObjectPrototype(o: any): boolean {
    return Object.prototype.toString.call(o) === '[object Object]'
}