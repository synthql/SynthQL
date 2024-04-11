FROM postgres:15

# Set environment variables
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_USER=postgres
ENV POSTGRES_DB=postgres

# Copy pagila schema and data sql files into docker image
COPY pagila/pagila-schema.sql /docker-entrypoint-initdb.d/1-schema.sql
COPY pagila/pagila-data.sql /docker-entrypoint-initdb.d/2-data.sql

# Expose port 5432 to access the database
EXPOSE 5432
