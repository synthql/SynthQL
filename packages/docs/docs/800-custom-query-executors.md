# Custom Query Executors

Although SynthQL provides great support for fetching data from your database, not all data comes from databases. Custom query executors let you execute parts of a query tree using a custom executor function.

This can be used to fetch data from a source other than your database, such as a REST endpoint, a file or any other data source you can imagine.

## How can I configure a custom executor

When constructing a `QueryEngine` you may pass a list of `executors`. In this example we're configuring a custom executor for the `rotten_tomatoes_rating` table.

```ts
import { QueryProviderExecutor } from "@synthql/backend";

interface DB {
    film: { id: number, title: string },
    rotten_tomatoes_rating: { title: string, rating: string }
}

const rottenTomatoesRatingProvider = new QueryProviderExecutor([{
    table: 'rotten_tomatoes_rating'.
    execute: (query) => {
        return fetchRottenTomatoesRating(query)
    }
}])

new QueryEngine({
    executors: rottenTomatoesRatingProvider
})
```

This lets you build queries like:

```ts
export function findFilm(id: number) {
    const rating = from('rotten_tomatoes_rating')
        .columns('title', 'rating')
        .where({ title: col('film.title') })
        .maybe();

    return from('film').columns('id', 'title').include({ rating }).many();
}
```

The query engine will send the `film` query to the database, and the `rotten_tomatoes_rating` query to the query executor.
