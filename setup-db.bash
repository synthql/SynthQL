#!/usr/bin/env bash

# This will setup postgres:15 with the Pagila database
docker build -t synthql-db:1 .

# Now run the image in the background on port 5432:5432
docker run -d -p 5432:5432 synthql-db:1
