# How to run tests

The tests assume you have a copy of the pagila database running locally on port 5432.

```bash
# Pull the PG image
docker pull postgres

# Start the DB
docker run --name synthql-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=postgres -p 5432:5432 -d postgres

git clone git@github.com:devrimgunduz/pagila.git

cat pagila/pagila-schema.sql | docker exec -i synthql-pg psql -U postgres -d pagila
cat pagila/pagila-data.sql | docker exec -i synthql-pg psql -U postgres -d pagila
```
