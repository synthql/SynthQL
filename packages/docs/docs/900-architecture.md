# Architecture

This is a brief, high level guide that documents SynthQL's architecture.

## Package structure

SynthQL is composed of 4 packages:

1.  `@synthql/queries`: contains the query builder and common types. This package can be used both in client and server code.

2.  `@synthql/backend`: contains the `QueryEngine`, which executes queries.

3.  `@synthql/cli`: the CLI that allow you to generate files from your database.

4.  `@synthql/react`: is the client that communicates with the query engine.

These are the dependencies between the packages.

![SynthQL packages](/img/architecture/packages.png)

## Information flow

This diagram shows how information flows through SynthQL. Requests are made by the client using `useSynthql`, which just sends the query over to the POST `/synthql` endpoint.

This then feeds the query to the `QueryEngine`, which eventually compiles the query down to `SQL` and sends it to the `PostgreSQL` database.

![Information flow](/img/architecture/flow.png)
