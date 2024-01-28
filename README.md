# Packages

## @synthql/backend

## @synthql/queries

## @synthql/react

## @synthql/docs

## @synthql/ui

Experimental UI for authoring XQL queries.

# Testing

```bash
# Pull the PG image
docker pull postgres

# Start the DB
docker run --name xql-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=postgres -p 5432:5432 -d postgres

git clone git@github.com:devrimgunduz/pagila.git

cat pagila/pagila-schema.sql | docker exec -i xql-pg psql -U postgres -d pagila
cat pagila/pagila-data.sql | docker exec -i xql-pg psql -U postgres -d pagila
```
