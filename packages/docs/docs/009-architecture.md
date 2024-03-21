# Architecture
This is a brief, high level guide that documents `synthql`s architecture.

## Package structure

Synthql is composed of 3 packages:

1. `@synthql/queries`: contains the query builder and common types. This package can be used both in client and server code.
2. `@synthql/backend`: contains the `QueryEngine`, which executes queries.
2. `@synthql/react`: is the client that communicates with the query engine.

These are the dependencies between the packages.

![synthql packages](/img/architecture/packages.png)

## Information flow

This diagram shows how information flows through synthql. Requests are made by the client using `useSynthql`, which just sends the query over to the `/synthql` endpoint. This then feeds the query to the `QueryEngine`, which eventually compiles the query down to `SQL` and sends it to `postgresql`.

![information flow](/img/architecture/flow.png)
