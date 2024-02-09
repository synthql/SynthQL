import { QueryEngine } from "@synthql/backend"

export let queryEngine: QueryEngine<any> | undefined = undefined

export async function initQueryEngine(url: string, schema: string): Promise<QueryEngine<any>> {
    if (!queryEngine) {
        const tmp = new QueryEngine({
            url,
            schema
        })

        const introspection = await tmp.introspect()
        console.log(introspection)
        queryEngine = tmp
    }
    return queryEngine
}