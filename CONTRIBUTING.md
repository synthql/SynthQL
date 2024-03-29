# Getting started

First, make sure you have node, yarn and docker installed.

```bash
# Install dependencies
yarn install

# Run this once to setup, and run the local PG database.
# This is a precondition for running tests
./setup-db.bash

# Run tests, typecheck, format, etc.
# Make sure you setup tests correctly. See the "how to run tests" section below.
yarn ci
```