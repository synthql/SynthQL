# Custom query providers

While SynthQL is designed for database queries, it can also work with other data sources. Custom query providers allow you to use specific functions to fetch data from non-database sources as part of your query.

This can be used to fetch data from a REST endpoint, a file or any other data source you can imagine.

## How can I configure a custom provider

When constructing a `QueryEngine` you may pass a list of `providers`. In this example we're configuring a custom provider for the `rotten_tomatoes_rating` table.

```ts
import { QueryProvider } from "@synthql/backend";

interface DB {
    film: {...}
    rotten_tomatoes_rating: {...}
}

const rottenTomatoesRatingProvider: QueryProvider<DB,'rotten_tomatoes_rating'> = {
    table: 'rotten_tomatoes_rating'.
    execute: ({title}) => {
        return fetchRottenTomatoesRatingByTitle(title)
    }
}

new QueryEngine({
    executors: [rottenTomatoesRatingProvider]
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
